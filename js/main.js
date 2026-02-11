// Main JavaScript for Free ITMT Tool

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav')) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                navLinks.classList.remove('active');
            }
        });
    });

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with fade-in class
    document.querySelectorAll('.tool-card, .benefit-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Utility Functions
const Utils = {
    // Show alert message
    showAlert: function(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} show`;
        alertDiv.textContent = message;
        
        const container = document.querySelector('.tool-container') || document.querySelector('.container');
        if (container) {
            container.insertBefore(alertDiv, container.firstChild);
            
            setTimeout(() => {
                alertDiv.classList.remove('show');
                setTimeout(() => alertDiv.remove(), 300);
            }, 5000);
        }
    },

    // Show loader
    showLoader: function(show = true) {
        let loader = document.querySelector('.loader');
        if (!loader) {
            loader = document.createElement('div');
            loader.className = 'loader';
            const container = document.querySelector('.tool-container') || document.querySelector('.container');
            if (container) {
                container.appendChild(loader);
            }
        }
        
        if (show) {
            loader.classList.add('active');
        } else {
            loader.classList.remove('active');
        }
    },

    // Download file
    downloadFile: function(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // Format file size
    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    },

    // Validate file type
    validateFileType: function(file, allowedTypes) {
        return allowedTypes.some(type => {
            if (type.includes('*')) {
                const baseType = type.split('/')[0];
                return file.type.startsWith(baseType);
            }
            return file.type === type;
        });
    },

    // Validate file size (in MB)
    validateFileSize: function(file, maxSizeMB) {
        const maxBytes = maxSizeMB * 1024 * 1024;
        return file.size <= maxBytes;
    }
};

// Drag and Drop Handler
class DragDropHandler {
    constructor(element, callback, allowedTypes = []) {
        this.element = element;
        this.callback = callback;
        this.allowedTypes = allowedTypes;
        this.init();
    }

    init() {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            this.element.addEventListener(eventName, this.preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            this.element.addEventListener(eventName, () => {
                this.element.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            this.element.addEventListener(eventName, () => {
                this.element.classList.remove('dragover');
            }, false);
        });

        this.element.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            this.handleFiles(files);
        }, false);
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleFiles(files) {
        const filesArray = Array.from(files);
        
        if (this.allowedTypes.length > 0) {
            const validFiles = filesArray.filter(file => 
                Utils.validateFileType(file, this.allowedTypes)
            );
            
            if (validFiles.length !== filesArray.length) {
                Utils.showAlert('Some files were skipped due to invalid file type.', 'error');
            }
            
            if (validFiles.length > 0) {
                this.callback(validFiles);
            }
        } else {
            this.callback(filesArray);
        }
    }
}

// Export for use in other files
window.Utils = Utils;
window.DragDropHandler = DragDropHandler;
