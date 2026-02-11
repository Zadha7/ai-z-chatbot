// Text to PDF Tool JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const generateBtn = document.getElementById('generateBtn');
    const previewBtn = document.getElementById('previewBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    // Format controls
    const fontSize = document.getElementById('fontSize');
    const fontFamily = document.getElementById('fontFamily');
    const lineHeight = document.getElementById('lineHeight');
    const textAlign = document.getElementById('textAlign');
    const pageSize = document.getElementById('pageSize');
    const margin = document.getElementById('margin');

    // Generate PDF
    generateBtn.addEventListener('click', function() {
        const text = textInput.value.trim();
        
        if (!text) {
            Utils.showAlert('Please enter some text to convert to PDF.', 'error');
            return;
        }

        Utils.showLoader(true);
        generateBtn.disabled = true;

        setTimeout(() => {
            try {
                const pdf = createPDF(text);
                const filename = 'text-document-' + Date.now() + '.pdf';
                pdf.save(filename);
                
                Utils.showLoader(false);
                generateBtn.disabled = false;
                Utils.showAlert('PDF generated successfully!', 'success');
            } catch (error) {
                console.error('PDF generation error:', error);
                Utils.showLoader(false);
                generateBtn.disabled = false;
                Utils.showAlert('Failed to generate PDF. Please try again.', 'error');
            }
        }, 500);
    });

    // Preview PDF
    previewBtn.addEventListener('click', function() {
        const text = textInput.value.trim();
        
        if (!text) {
            Utils.showAlert('Please enter some text to preview.', 'error');
            return;
        }

        Utils.showLoader(true);
        previewBtn.disabled = true;

        setTimeout(() => {
            try {
                const pdf = createPDF(text);
                const pdfBlob = pdf.output('blob');
                const url = URL.createObjectURL(pdfBlob);
                
                // Open in new window
                window.open(url, '_blank');
                
                Utils.showLoader(false);
                previewBtn.disabled = false;
                Utils.showAlert('Preview opened in new tab.', 'success');
            } catch (error) {
                console.error('PDF preview error:', error);
                Utils.showLoader(false);
                previewBtn.disabled = false;
                Utils.showAlert('Failed to preview PDF. Please try again.', 'error');
            }
        }, 500);
    });

    // Clear text
    clearBtn.addEventListener('click', function() {
        if (textInput.value.trim() && confirm('Are you sure you want to clear all text?')) {
            textInput.value = '';
            Utils.showAlert('Text cleared.', 'info');
        }
    });

    // Create PDF document
    function createPDF(text) {
        const { jsPDF } = window.jspdf;
        
        // Get page dimensions
        const pageSizeValue = pageSize.value;
        const orientation = 'portrait';
        
        // Create new PDF
        const doc = new jsPDF({
            orientation: orientation,
            unit: 'in',
            format: pageSizeValue
        });

        // Get settings
        const fontSizeValue = parseInt(fontSize.value);
        const fontFamilyValue = fontFamily.value;
        const lineSpacing = parseFloat(lineHeight.value);
        const alignment = textAlign.value;
        const marginValue = parseFloat(margin.value);

        // Set font
        doc.setFont(fontFamilyValue);
        doc.setFontSize(fontSizeValue);

        // Get page dimensions
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const textWidth = pageWidth - (marginValue * 2);
        const textHeight = pageHeight - (marginValue * 2);

        // Split text into lines
        const lines = doc.splitTextToSize(text, textWidth);
        
        // Calculate line height in inches
        const lineHeightInches = (fontSizeValue / 72) * lineSpacing;
        
        let y = marginValue;
        let currentPage = 1;

        lines.forEach((line, index) => {
            // Check if we need a new page
            if (y + lineHeightInches > pageHeight - marginValue) {
                doc.addPage();
                y = marginValue;
                currentPage++;
            }

            // Calculate x position based on alignment
            let x = marginValue;
            
            if (alignment === 'center') {
                const lineWidth = doc.getTextWidth(line);
                x = (pageWidth - lineWidth) / 2;
            } else if (alignment === 'right') {
                const lineWidth = doc.getTextWidth(line);
                x = pageWidth - marginValue - lineWidth;
            }
            // For 'justify' and 'left', use default left margin

            doc.text(line, x, y + (fontSizeValue / 72));
            y += lineHeightInches;
        });

        return doc;
    }

    // Sample text button (helpful for testing)
    const sampleTextBtn = document.createElement('button');
    sampleTextBtn.className = 'btn btn-secondary';
    sampleTextBtn.innerHTML = '<i class="fas fa-file-import"></i> Load Sample Text';
    sampleTextBtn.style.marginTop = '1rem';
    
    const buttonGroup = document.querySelector('.button-group');
    if (buttonGroup && !textInput.value) {
        const sampleBtnContainer = document.createElement('div');
        sampleBtnContainer.style.textAlign = 'center';
        sampleBtnContainer.style.marginTop = '1rem';
        sampleBtnContainer.appendChild(sampleTextBtn);
        textInput.parentNode.appendChild(sampleBtnContainer);
        
        sampleTextBtn.addEventListener('click', function() {
            textInput.value = `Sample Document

This is a sample text document that demonstrates the Text to PDF conversion tool. You can customize various formatting options to create professional-looking PDF documents.

Features:
• Multiple font families (Helvetica, Times New Roman, Courier)
• Adjustable font sizes from 10pt to 24pt
• Line spacing options (Single, 1.15, 1.5, Double)
• Text alignment (Left, Center, Right, Justify)
• Various page sizes (A4, Letter, Legal)
• Customizable margins

How to Use:
1. Enter or paste your text in the text area
2. Adjust the formatting options to your preference
3. Click "Generate PDF" to download your document
4. Use "Preview" to see how it looks before downloading

This tool is perfect for creating simple text documents, letters, reports, and more. All processing happens in your browser, so your content stays private and secure.

Replace this sample text with your own content and start creating professional PDF documents today!`;
            
            sampleBtnContainer.remove();
            Utils.showAlert('Sample text loaded. You can now edit it or generate a PDF.', 'info');
        });
    }
});
