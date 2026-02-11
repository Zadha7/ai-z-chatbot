// Image Watermark Tool JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');
    const controls = document.getElementById('controls');
    const previewArea = document.getElementById('previewArea');
    const buttonGroup = document.getElementById('buttonGroup');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Control elements
    const watermarkText = document.getElementById('watermarkText');
    const fontSize = document.getElementById('fontSize');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const opacity = document.getElementById('opacity');
    const opacityValue = document.getElementById('opacityValue');
    const position = document.getElementById('position');
    const textColor = document.getElementById('textColor');
    const fontFamily = document.getElementById('fontFamily');
    const boldText = document.getElementById('boldText');
    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');

    let originalImage = null;

    // Setup drag and drop
    new DragDropHandler(uploadArea, handleFiles, ['image/*']);

    // Click to upload
    uploadArea.addEventListener('click', () => imageInput.click());
    imageInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFiles([e.target.files[0]]);
        }
    });

    // Handle file upload
    function handleFiles(files) {
        const file = files[0];

        if (!Utils.validateFileType(file, ['image/*'])) {
            Utils.showAlert('Please upload a valid image file (JPG, PNG, WebP).', 'error');
            return;
        }

        if (!Utils.validateFileSize(file, 10)) {
            Utils.showAlert('File size must be less than 10MB.', 'error');
            return;
        }

        Utils.showLoader(true);

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                originalImage = img;
                setupCanvas();
                drawWatermark();
                
                // Show controls and preview
                controls.style.display = 'block';
                previewArea.style.display = 'block';
                buttonGroup.style.display = 'flex';
                uploadArea.style.display = 'none';
                
                Utils.showLoader(false);
                Utils.showAlert('Image loaded successfully! Customize your watermark below.', 'success');
            };
            img.onerror = function() {
                Utils.showLoader(false);
                Utils.showAlert('Failed to load image. Please try another file.', 'error');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Setup canvas dimensions
    function setupCanvas() {
        const maxWidth = 800;
        const maxHeight = 600;
        
        let width = originalImage.width;
        let height = originalImage.height;
        
        // Scale down if too large
        if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = width * ratio;
            height = height * ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
    }

    // Draw watermark on canvas
    function drawWatermark() {
        if (!originalImage) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw original image
        ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

        // Prepare watermark settings
        const text = watermarkText.value || '© Your Name';
        const size = parseInt(fontSize.value);
        const alpha = parseInt(opacity.value) / 100;
        const color = textColor.value;
        const font = fontFamily.value;
        const bold = boldText.checked;
        const pos = position.value;

        // Set font
        const fontWeight = bold ? 'bold' : 'normal';
        ctx.font = `${fontWeight} ${size}px ${font}`;
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;

        // Calculate text position
        const textMetrics = ctx.measureText(text);
        const textWidth = textMetrics.width;
        const textHeight = size;
        const padding = 20;

        let x, y;

        switch(pos) {
            case 'bottom-right':
                x = canvas.width - textWidth - padding;
                y = canvas.height - padding;
                break;
            case 'bottom-left':
                x = padding;
                y = canvas.height - padding;
                break;
            case 'top-right':
                x = canvas.width - textWidth - padding;
                y = textHeight + padding;
                break;
            case 'top-left':
                x = padding;
                y = textHeight + padding;
                break;
            case 'center':
                x = (canvas.width - textWidth) / 2;
                y = (canvas.height + textHeight) / 2;
                break;
            default:
                x = canvas.width - textWidth - padding;
                y = canvas.height - padding;
        }

        // Draw watermark text
        ctx.fillText(text, x, y);
        
        // Reset alpha
        ctx.globalAlpha = 1.0;
    }

    // Update displays
    fontSize.addEventListener('input', function() {
        fontSizeValue.textContent = this.value + 'px';
        drawWatermark();
    });

    opacity.addEventListener('input', function() {
        opacityValue.textContent = this.value + '%';
        drawWatermark();
    });

    // Redraw on any control change
    watermarkText.addEventListener('input', drawWatermark);
    position.addEventListener('change', drawWatermark);
    textColor.addEventListener('input', drawWatermark);
    fontFamily.addEventListener('change', drawWatermark);
    boldText.addEventListener('change', drawWatermark);

    // Download button
    downloadBtn.addEventListener('click', function() {
        if (!originalImage) return;

        canvas.toBlob(function(blob) {
            const filename = 'watermarked-image-' + Date.now() + '.png';
            Utils.downloadFile(blob, filename);
            Utils.showAlert('Image downloaded successfully!', 'success');
            
            // Add success animation
            canvas.classList.add('success-animation');
            setTimeout(() => canvas.classList.remove('success-animation'), 500);
        }, 'image/png');
    });

    // Reset button
    resetBtn.addEventListener('click', function() {
        originalImage = null;
        imageInput.value = '';
        
        // Reset controls
        watermarkText.value = '© Your Name';
        fontSize.value = 48;
        fontSizeValue.textContent = '48px';
        opacity.value = 70;
        opacityValue.textContent = '70%';
        position.value = 'bottom-right';
        textColor.value = '#ffffff';
        fontFamily.value = 'Arial';
        boldText.checked = false;
        
        // Hide everything and show upload area
        controls.style.display = 'none';
        previewArea.style.display = 'none';
        buttonGroup.style.display = 'none';
        uploadArea.style.display = 'block';
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
});
