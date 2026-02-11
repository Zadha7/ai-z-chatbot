// PDF Merge Tool JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const pdfInput = document.getElementById('pdfInput');
    const fileListContainer = document.getElementById('fileListContainer');
    const fileList = document.getElementById('fileList');
    const buttonGroup = document.getElementById('buttonGroup');
    const mergeBtn = document.getElementById('mergeBtn');
    const addMoreBtn = document.getElementById('addMoreBtn');
    const resetBtn = document.getElementById('resetBtn');

    let pdfFiles = [];
    let draggedElement = null;

    // Setup drag and drop
    new DragDropHandler(uploadArea, handleFiles, ['application/pdf']);

    // Click to upload
    uploadArea.addEventListener('click', () => pdfInput.click());
    pdfInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFiles(Array.from(e.target.files));
        }
    });

    // Add more PDFs button
    addMoreBtn.addEventListener('click', () => pdfInput.click());

    // Handle file upload
    function handleFiles(files) {
        const validFiles = files.filter(file => {
            if (!Utils.validateFileType(file, ['application/pdf'])) {
                Utils.showAlert(`${file.name} is not a PDF file.`, 'error');
                return false;
            }
            if (!Utils.validateFileSize(file, 50)) {
                Utils.showAlert(`${file.name} is too large (max 50MB).`, 'error');
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) return;

        // Add to files array
        validFiles.forEach(file => {
            pdfFiles.push({
                file: file,
                id: Date.now() + Math.random()
            });
        });

        renderFileList();
        
        // Hide upload area and show file list
        uploadArea.style.display = 'none';
        fileListContainer.style.display = 'block';
        buttonGroup.style.display = 'flex';

        Utils.showAlert(`${validFiles.length} PDF file(s) added successfully!`, 'success');
    }

    // Render file list
    function renderFileList() {
        fileList.innerHTML = '';

        pdfFiles.forEach((pdfFile, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.draggable = true;
            fileItem.dataset.id = pdfFile.id;

            fileItem.innerHTML = `
                <div class="file-item-info">
                    <i class="fas fa-grip-vertical" style="color: var(--text-light); cursor: grab;"></i>
                    <i class="fas fa-file-pdf" style="color: var(--primary-color); font-size: 1.5rem;"></i>
                    <div>
                        <strong>${pdfFile.file.name}</strong>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--text-light);">${Utils.formatFileSize(pdfFile.file.size)}</p>
                    </div>
                </div>
                <button onclick="removeFile(${index})">
                    <i class="fas fa-times"></i> Remove
                </button>
            `;

            // Drag events
            fileItem.addEventListener('dragstart', handleDragStart);
            fileItem.addEventListener('dragover', handleDragOver);
            fileItem.addEventListener('drop', handleDrop);
            fileItem.addEventListener('dragend', handleDragEnd);

            fileList.appendChild(fileItem);
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
            this.style.borderTop = '3px solid var(--primary-color)';
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

            const draggedIndex = pdfFiles.findIndex(f => f.id == draggedId);
            const targetIndex = pdfFiles.findIndex(f => f.id == targetId);

            // Swap items
            const temp = pdfFiles[draggedIndex];
            pdfFiles[draggedIndex] = pdfFiles[targetIndex];
            pdfFiles[targetIndex] = temp;

            renderFileList();
        }

        this.style.borderTop = '';
        return false;
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';
        document.querySelectorAll('.file-item').forEach(item => {
            item.style.borderTop = '';
        });
    }

    // Remove file
    window.removeFile = function(index) {
        pdfFiles.splice(index, 1);
        
        if (pdfFiles.length === 0) {
            resetTool();
        } else {
            renderFileList();
            Utils.showAlert('PDF removed.', 'info');
        }
    };

    // Merge PDFs
    mergeBtn.addEventListener('click', async function() {
        if (pdfFiles.length < 2) {
            Utils.showAlert('Please upload at least 2 PDF files to merge.', 'error');
            return;
        }

        Utils.showLoader(true);
        mergeBtn.disabled = true;

        try {
            const { PDFDocument } = PDFLib;
            const mergedPdf = await PDFDocument.create();

            // Process each PDF
            for (let i = 0; i < pdfFiles.length; i++) {
                const fileBytes = await pdfFiles[i].file.arrayBuffer();
                const pdf = await PDFDocument.load(fileBytes);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                
                copiedPages.forEach((page) => {
                    mergedPdf.addPage(page);
                });
            }

            // Save merged PDF
            const mergedPdfBytes = await mergedPdf.save();
            const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
            const filename = 'merged-document-' + Date.now() + '.pdf';
            
            Utils.downloadFile(blob, filename);
            Utils.showLoader(false);
            mergeBtn.disabled = false;
            
            Utils.showAlert('PDFs merged successfully! Download started.', 'success');

        } catch (error) {
            console.error('Merge error:', error);
            Utils.showLoader(false);
            mergeBtn.disabled = false;
            Utils.showAlert('Failed to merge PDFs. Please ensure all files are valid PDF documents.', 'error');
        }
    });

    // Reset tool
    resetBtn.addEventListener('click', resetTool);

    function resetTool() {
        pdfFiles = [];
        pdfInput.value = '';
        fileList.innerHTML = '';
        
        uploadArea.style.display = 'block';
        fileListContainer.style.display = 'none';
        buttonGroup.style.display = 'none';
    }
});
