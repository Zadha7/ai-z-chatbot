# Free ITMT Tool

A comprehensive, free online toolkit for image and PDF processing. All tools work entirely in your browser with client-side processing for maximum privacy and security.

![Free ITMT Tool](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Privacy First](https://img.shields.io/badge/Privacy-Client%20Side%20Only-blue)
![License](https://img.shields.io/badge/License-Free%20to%20Use-success)

## 🌟 Features

Free ITMT Tool provides five powerful, production-ready tools:

### 1. **Image Watermark Tool** (`image-watermark.html`)
- Add custom text watermarks to images
- Adjust font size, opacity, position, color, and font family
- Support for bold text styling
- Real-time preview
- Download watermarked images in PNG format

### 2. **Image to Text Tool** (`image-to-text.html`)
- Extract text from images using Tesseract.js OCR
- Support for JPG, PNG, and WebP formats
- Real-time progress tracking
- Copy extracted text to clipboard
- Download text as TXT file

### 3. **PDF Merge Tool** (`pdf-merge.html`)
- Combine multiple PDF files into one document
- Drag-and-drop reordering interface
- Support for unlimited PDF files (within browser memory limits)
- Preview uploaded files with size information

### 4. **Text to PDF Tool** (`text-to-pdf.html`)
- Convert text to professionally formatted PDF documents
- Customizable font size, family, line spacing, and alignment
- Support for multiple page sizes (A4, Letter, Legal)
- Adjustable margins
- Preview before download

### 5. **Image to PDF Tool** (`image-to-pdf.html`)
- Convert single or multiple images to PDF
- Drag-and-drop image reordering
- Customizable page size and orientation
- Multiple image fit modes (contain, cover, stretch)
- Adjustable margins

## 🎨 Design Highlights

- **Brand Color**: #eb347d (vibrant pink/magenta)
- **Animated Hero Section**: Floating particle system with tool icons
- **Responsive Design**: Mobile-first approach, works on all devices
- **Smooth Animations**: Hover effects, transitions, and scroll animations
- **Modern UI/UX**: Clean, intuitive interfaces with clear visual feedback

## 📁 Project Structure

```
free-itmt-tool/
├── index.html                 # Homepage with tool cards
├── image-watermark.html       # Image watermarking tool
├── image-to-text.html         # OCR text extraction tool
├── pdf-merge.html             # PDF merging tool
├── text-to-pdf.html           # Text to PDF converter
├── image-to-pdf.html          # Image to PDF converter
├── about.html                 # About Us page (450+ words)
├── contact.html               # Contact page with form & FAQ
├── privacy.html               # Privacy Policy (700+ words)
├── disclaimer.html            # Disclaimer (500+ words)
├── css/
│   └── style.css              # Main stylesheet with animations
└── js/
    ├── main.js                # Core utilities and navigation
    ├── particles.js           # Animated particle system
    ├── image-watermark.js     # Watermark tool logic
    ├── image-to-text.js       # OCR tool logic
    ├── pdf-merge.js           # PDF merge logic
    ├── text-to-pdf.js         # Text to PDF logic
    └── image-to-pdf.js        # Image to PDF logic
```

## 🚀 Technologies Used

### Core Technologies
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations and transitions
- **JavaScript (ES6+)**: Client-side processing and interactivity

### External Libraries (via CDN)
- **Tesseract.js v4**: OCR (Optical Character Recognition)
- **jsPDF v2.5.1**: PDF generation
- **PDF-Lib v1.17.1**: PDF manipulation and merging
- **Font Awesome v6.4.0**: Icons
- **Google Fonts (Inter)**: Typography

## 🔒 Privacy & Security

**All processing happens in your browser!**

- ✅ Files never leave your device
- ✅ No server-side storage or uploads
- ✅ No user accounts or registration required
- ✅ No tracking of file content
- ✅ Client-side JavaScript processing only

## 🌐 Browser Compatibility

Free ITMT Tool works on all modern browsers:

- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Opera (v76+)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🎯 SEO Optimization

### Homepage Meta Tags
```html
<title>Free ITMT Tool - Image Watermark, PDF Merge, Image to Text & More | 100% Free Online Tools</title>
<meta name="description" content="Free online tools for image watermarking, PDF merging, image to text conversion, text to PDF, and image to PDF conversion. No signup required. Fast, secure, and easy to use.">
<meta name="keywords" content="Free Image Watermark Tool, image to text tool, pdf merge tool, text to pdf tool, image to pdf tool, free online tools">
```

## 🛠️ Features Currently Implemented

### ✅ Completed Features

1. **Homepage**
   - Hero section with animated floating particles
   - 5 tool cards with hover effects
   - Benefits section with 6 key advantages
   - Fully responsive navigation with mobile menu
   - SEO-optimized meta tags

2. **All 5 Tools**
   - Fully functional and production-ready
   - Drag-and-drop file upload
   - Real-time preview
   - Progress indicators
   - Error handling and user feedback
   - Download functionality

3. **Content Pages**
   - About Us (450+ words)
   - Contact Us (form + 10 FAQs)
   - Privacy Policy (700+ words, GDPR/CCPA compliant)
   - Disclaimer (500+ words, comprehensive legal coverage)

4. **Design & UX**
   - Smooth animations and transitions
   - Hover effects on all interactive elements
   - Loading states and progress bars
   - Success/error message system
   - Mobile-responsive design

5. **Footer**
   - 4-column layout
   - Social media links (placeholder URLs)
   - Quick navigation
   - Tool links
   - Legal links

## 🎨 Animation Features

- **Particle System**: Continuously floating tool icons in hero section
- **Hover Effects**: 
  - Tool cards lift and glow on hover
  - Buttons scale and change shadow
  - Navigation links underline animation
- **Scroll Animations**: Fade-in effects for content
- **Loading Animations**: Smooth spinners for processing states
- **Success Animations**: Pulse effect on completion

## 📋 File Size Recommendations

- **Images**: < 10MB for optimal performance
- **PDFs**: < 50MB per file
- **Total Memory**: Consider browser memory constraints for multiple files

## 🔧 Tool-Specific Details

### Image Watermark
- **Input**: JPG, PNG, WebP
- **Output**: PNG
- **Settings**: Text, font size (12-120px), opacity (0-100%), position, color, font family, bold option

### Image to Text
- **Input**: JPG, PNG, WebP
- **OCR Engine**: Tesseract.js (English language)
- **Output**: Editable text, downloadable TXT file
- **Processing**: Real-time progress tracking

### PDF Merge
- **Input**: Multiple PDF files
- **Features**: Drag-to-reorder, unlimited files (memory permitting)
- **Output**: Single merged PDF

### Text to PDF
- **Input**: Plain text
- **Settings**: Font size (10-24pt), font family, line spacing, alignment, page size, margins
- **Output**: Formatted PDF document
- **Features**: Preview before download, sample text loader

### Image to PDF
- **Input**: Multiple images (JPG, PNG, WebP)
- **Settings**: Page size, orientation, image fit mode, margins
- **Features**: Drag-to-reorder images
- **Output**: Multi-page PDF

## 🚀 Deployment

This is a static website that can be deployed to any static hosting service:

- **GitHub Pages**: Push to gh-pages branch
- **Netlify**: Drag and drop or connect to Git
- **Vercel**: Import from Git repository
- **AWS S3 + CloudFront**: Static website hosting
- **Traditional Web Hosting**: Upload via FTP

### To Deploy:
1. Upload all files to your web server
2. Ensure directory structure is preserved
3. No server-side configuration required
4. Works immediately after upload

## 🎯 Future Enhancement Ideas

- [ ] Add more languages for OCR
- [ ] PDF editing tools (rotate, crop, split)
- [ ] Image compression tool
- [ ] Batch image resizing
- [ ] QR code generator
- [ ] File format conversion tools
- [ ] Dark mode toggle
- [ ] More watermark options (image watermarks, patterns)

## 📧 Contact & Support

- **Email**: support@freeitmttool.com
- **Privacy Email**: privacy@freeitmttool.com
- **Contact Page**: Available on website

## 📄 License

Free ITMT Tool is free to use for personal, educational, and commercial purposes. No special license required.

## 🙏 Acknowledgments

This project uses the following open-source libraries:
- Tesseract.js (Apache License 2.0)
- jsPDF (MIT License)
- PDF-Lib (MIT License)
- Font Awesome (Font Awesome Free License)

## 📊 Project Status

**Status**: ✅ Production Ready

All 5 tools are fully functional, tested, and ready for public use. The website is complete with all content pages, legal documents, and responsive design.

---

**Made with ❤️ for everyone | Free Forever | No Signup Required**
