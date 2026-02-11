// Image to Text (OCR) Tool JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');
    const previewArea = document.getElementById('previewArea');
    const previewImage = document.getElementById('previewImage');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const progressStatus = document.getElementById('progressStatus');
    const resultsArea = document.getElementById('resultsArea');
    const extractedText = document.getElementById('extractedText');
    const copyBtn = document.getElementById('copyBtn');
    const downloadTextBtn = document.getElementById('downloadTextBtn');
    const resetBtn = document.getElementById('resetBtn');

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

        // Show preview
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewArea.style.display = 'block';
            uploadArea.style.display = 'none';
            
            // Start OCR processing
            processOCR(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    // Process OCR using Tesseract.js
    async function processOCR(imageSrc) {
        progressContainer.style.display = 'block';
        progressStatus.textContent = 'Initializing OCR engine...';
        
        try {
            const worker = await Tesseract.createWorker({
                logger: function(m) {
                    if (m.status === 'recognizing text') {
                        const percent = Math.round(m.progress * 100);
                        progressBar.style.width = percent + '%';
                        progressText.textContent = percent + '%';
                        progressStatus.textContent = 'Recognizing text from image...';
                    } else if (m.status === 'loading tesseract core') {
                        progressStatus.textContent = 'Loading OCR engine...';
                        progressBar.style.width = '10%';
                        progressText.textContent = '10%';
                    } else if (m.status === 'initializing tesseract') {
                        progressStatus.textContent = 'Initializing OCR...';
                        progressBar.style.width = '20%';
                        progressText.textContent = '20%';
                    } else if (m.status === 'loading language traineddata') {
                        progressStatus.textContent = 'Loading language data...';
                        progressBar.style.width = '30%';
                        progressText.textContent = '30%';
                    } else if (m.status === 'initializing api') {
                        progressStatus.textContent = 'Preparing for recognition...';
                        progressBar.style.width = '40%';
                        progressText.textContent = '40%';
                    }
                }
            });

            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            
            const { data: { text } } = await worker.recognize(imageSrc);
            
            await worker.terminate();

            // Show results
            progressBar.style.width = '100%';
            progressText.textContent = '100%';
            progressStatus.textContent = 'Text extraction complete!';
            
            setTimeout(() => {
                progressContainer.style.display = 'none';
                displayResults(text);
            }, 1000);

        } catch (error) {
            console.error('OCR Error:', error);
            progressContainer.style.display = 'none';
            Utils.showAlert('Failed to extract text from image. Please try another image.', 'error');
            resetTool();
        }
    }

    // Display extracted text
    function displayResults(text) {
        if (!text || text.trim() === '') {
            extractedText.value = 'No text was detected in the image. Please try an image with clearer text.';
            Utils.showAlert('No text detected in the image.', 'info');
        } else {
            extractedText.value = text;
            Utils.showAlert('Text extracted successfully! You can now copy or download the text.', 'success');
        }
        
        resultsArea.style.display = 'block';
    }

    // Copy text to clipboard
    copyBtn.addEventListener('click', function() {
        if (!extractedText.value) {
            Utils.showAlert('No text to copy.', 'error');
            return;
        }

        extractedText.select();
        document.execCommand('copy');
        
        // Modern clipboard API fallback
        if (navigator.clipboard) {
            navigator.clipboard.writeText(extractedText.value).then(() => {
                Utils.showAlert('Text copied to clipboard!', 'success');
                
                // Change button text temporarily
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            }).catch(() => {
                Utils.showAlert('Failed to copy text.', 'error');
            });
        } else {
            Utils.showAlert('Text copied to clipboard!', 'success');
        }
    });

    // Download text as file
    downloadTextBtn.addEventListener('click', function() {
        if (!extractedText.value) {
            Utils.showAlert('No text to download.', 'error');
            return;
        }

        const blob = new Blob([extractedText.value], { type: 'text/plain' });
        const filename = 'extracted-text-' + Date.now() + '.txt';
        Utils.downloadFile(blob, filename);
        Utils.showAlert('Text file downloaded successfully!', 'success');
    });

    // Reset tool
    resetBtn.addEventListener('click', resetTool);

    function resetTool() {
        imageInput.value = '';
        previewImage.src = '';
        extractedText.value = '';
        
        uploadArea.style.display = 'block';
        previewArea.style.display = 'none';
        progressContainer.style.display = 'none';
        resultsArea.style.display = 'none';
        
        progressBar.style.width = '0%';
        progressText.textContent = '0%';
        progressStatus.textContent = '';
    }
});
