// Image to PDF Tool JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');
    const imageGridContainer = document.getElementById('imageGridContainer');
    const imageGrid = document.getElementById('imageGrid');
    const optionsContainer = document.getElementById('optionsContainer');
    const buttonGroup = document.getElementById('buttonGroup');
    const convertBtn = document.getElementById('convertBtn');
    const addMoreBtn = document.getElementById('addMoreBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Options
    const pageSize = document.getElementById('pageSize');
    const orientation = document.getElementById('orientation');
    const imageFit = document.getElementById('imageFit');
    const margin = document.getElementById('margin');

    let imageFiles = [];
    let draggedElement = null;

    // Setup drag and drop
    new DragDropHandler(uploadArea, handleFiles, ['image/*']);

    // Click to upload
    uploadArea.addEventListener('click', () => imageInput.click());
    imageInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFiles(Array.from(e.target.files));
        }
    });

    // Add more images button
    addMoreBtn.addEventListener('click', () => imageInput.click());

    // Handle file upload
    function handleFiles(files) {
        const validFiles = files.filter(file => {
            if (!Utils.validateFileType(file, ['image/*'])) {
                Utils.showAlert(`${file.name} is not a valid image file.`, 'error');
                return false;
            }
            if (!Utils.validateFileSize(file, 10)) {
                Utils.showAlert(`${file.name} is too large (max 10MB).`, 'error');
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) return;

        Utils.showLoader(true);

        // Process each file
        const promises = validFiles.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imageFiles.push({
                        file: file,
                        dataUrl: e.target.result,
                        id: Date.now() + Math.random()
                    });
                    resolve();
                };
                reader.readAsDataURL(file);
            });
        });

        Promise.all(promises).then(() => {
            renderImageGrid();
            
            // Hide upload area and show image grid
            uploadArea.style.display = 'none';
            imageGridContainer.style.display = 'block';
            optionsContainer.style.display = 'block';
            buttonGroup.style.display = 'flex';
            
            Utils.showLoader(false);
            Utils.showAlert(`${validFiles.length} image(s) added successfully!`, 'success');
        });
    }

    // Render image grid
    function renderImageGrid() {
        imageGrid.innerHTML = '';

        imageFiles.forEach((imageFile, index) => {
            const imageItem = document.createElement('div');
            imageItem.className = 'image-item';
            imageItem.draggable = true;
            imageItem.dataset.id = imageFile.id;
            imageItem.style.cssText = `
                position: relative;
                background: var(--bg-light);
                border-radius: 8px;
                overflow: hidden;
                cursor: move;
                transition: all 0.3s ease;
                border: 2px solid transparent;
            `;

            imageItem.innerHTML = `
                <img src="${imageFile.dataUrl}" alt="${imageFile.file.name}" style="width: 100%; height: 200px; object-fit: cover;">
                <div style="padding: 0.75rem;">
                    <p style="margin: 0; font-size: 0.85rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${imageFile.file.name}</p>
                    <p style="margin: 0.25rem 0 0 0; font-size: 0.75rem; color: var(--text-light);">${Utils.formatFileSize(imageFile.file.size)}</p>
                </div>
                <button onclick="removeImage(${index})" style="position: absolute; top: 10px; right: 10px; background: rgba(220, 53, 69, 0.9); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;">
                    <i class="fas fa-times"></i>
                </button>
            `;

            // Drag events
            imageItem.addEventListener('dragstart', handleDragStart);
            imageItem.addEventListener('dragover', handleDragOver);
            imageItem.addEventListener('drop', handleDrop);
            imageItem.addEventListener('dragend', handleDragEnd);
            
            // Hover effect
            imageItem.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
                this.style.borderColor = 'var(--primary-color)';
            });
            
            imageItem.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
                this.style.borderColor = 'transparent';
            });

            imageGrid.appendChild(imageItem);
        });
    }

    // Drag and drop for reordering
    function handleDragStart(e) {
        draggedElement = this;
        this.style.opacity = '0.5';
        e.dataTransfer.effectAllowed = 'move';
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        
        if (this !== draggedElement) {
            this.style.border = '3px solid var(--primary-color)';
        }
        return false;
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (draggedElement !== this) {
            const draggedId = draggedElement.dataset.id;
            const targetId = this.dataset.id;

            const draggedIndex = imageFiles.findIndex(f => f.id == draggedId);
            const targetIndex = imageFiles.findIndex(f => f.id == targetId);

            // Swap items
            const temp = imageFiles[draggedIndex];
            imageFiles[draggedIndex] = imageFiles[targetIndex];
            imageFiles[targetIndex] = temp;

            renderImageGrid();
        }

        this.style.border = '2px solid transparent';
        return false;
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';
        document.querySelectorAll('.image-item').forEach(item => {
            item.style.border = '2px solid transparent';
        });
    }

    // Remove image
    window.removeImage = function(index) {
        imageFiles.splice(index, 1);
        
        if (imageFiles.length === 0) {
            resetTool();
        } else {
            renderImageGrid();
            Utils.showAlert('Image removed.', 'info');
        }
    };

    // Convert to PDF
    convertBtn.addEventListener('click', async function() {
        if (imageFiles.length === 0) {
            Utils.showAlert('Please upload at least one image.', 'error');
            return;
        }

        Utils.showLoader(true);
        convertBtn.disabled = true;

        try {
            const { jsPDF } = window.jspdf;
            
            // Get settings
            const pageSizeValue = pageSize.value;
            const orientationValue = orientation.value;
            const fitMode = imageFit.value;
            const marginValue = parseInt(margin.value);

            // Create PDF
            const doc = new jsPDF({
                orientation: orientationValue,
                unit: 'mm',
                format: pageSizeValue
            });

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            for (let i = 0; i < imageFiles.length; i++) {
                if (i > 0) {
                    doc.addPage();
                }

                const img = imageFiles[i].dataUrl;
                
                // Calculate dimensions
                const tempImg = new Image();
                tempImg.src = img;
                
                await new Promise((resolve) => {
                    tempImg.onload = function() {
                        const imgWidth = this.width;
                        const imgHeight = this.height;
                        const imgRatio = imgWidth / imgHeight;
                        
                        const availableWidth = pageWidth - (marginValue * 2);
                        const availableHeight = pageHeight - (marginValue * 2);
                        const pageRatio = availableWidth / availableHeight;
                        
                        let finalWidth, finalHeight, x, y;
                        
                        if (fitMode === 'contain') {
                            if (imgRatio > pageRatio) {
                                finalWidth = availableWidth;
                                finalHeight = availableWidth / imgRatio;
                            } else {
                                finalHeight = availableHeight;
                                finalWidth = availableHeight * imgRatio;
                            }
                            x = marginValue + (availableWidth - finalWidth) / 2;
                            y = marginValue + (availableHeight - finalHeight) / 2;
                        } else if (fitMode === 'cover') {
                            if (imgRatio > pageRatio) {
                                finalHeight = availableHeight;
                                finalWidth = availableHeight * imgRatio;
                            } else {
                                finalWidth = availableWidth;
                                finalHeight = availableWidth / imgRatio;
                            }
                            x = marginValue + (availableWidth - finalWidth) / 2;
                            y = marginValue + (availableHeight - finalHeight) / 2;
                        } else { // stretch
                            finalWidth = availableWidth;
                            finalHeight = availableHeight;
                            x = marginValue;
                            y = marginValue;
                        }
                        
                        doc.addImage(img, 'JPEG', x, y, finalWidth, finalHeight);
                        resolve();
                    };
                });
            }

            // Save PDF
            const filename = 'images-to-pdf-' + Date.now() + '.pdf';
            doc.save(filename);
            
            Utils.showLoader(false);
            convertBtn.disabled = false;
            Utils.showAlert('PDF created successfully! Download started.', 'success');

        } catch (error) {
            console.error('Conversion error:', error);
            Utils.showLoader(false);
            convertBtn.disabled = false;
            Utils.showAlert('Failed to convert images to PDF. Please try again.', 'error');
        }
    });

    // Reset tool
    resetBtn.addEventListener('click', resetTool);

    function resetTool() {
        imageFiles = [];
        imageInput.value = '';
        imageGrid.innerHTML = '';
        
        uploadArea.style.display = 'block';
        imageGridContainer.style.display = 'none';
        optionsContainer.style.display = 'none';
        buttonGroup.style.display = 'none';
    }
});
