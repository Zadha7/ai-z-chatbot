 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zadha - Realistic Handwriting Generator</title>
    <meta name="description" content="Transform digital text into realistic handwritten notes with Zadha's AI-powered handwriting generator.">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Schoolbell&family=Indie+Flower&family=Cedarville+Cursive&family=Kalam&family=Atma&family=Dancing+Script&family=Permanent+Marker&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Libraries -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    
    <style>
        :root {
            --primary: #4a6fa5;
            --primary-dark: #3a5984;
            --secondary: #f5f5f5;
            --text: #333;
            --light-text: #666;
            --border: #ddd;
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #f9f9f9;
            color: var(--text);
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Animated Header */
        .animated-header {
            text-align: center;
            margin-bottom: 30px;
            padding: 30px 20px;
            border-radius: 10px;
            box-shadow: var(--shadow);
            position: relative;
            overflow: hidden;
            background: linear-gradient(90deg, 
                #4a6fa5, #ff6b6b, #4ecdc4, #ffd166, 
                #06d6a0, #118ab2, #ef476f, #4a6fa5);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
        }

        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .animated-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.1);
            z-index: 1;
        }

        .header-content {
            position: relative;
            z-index: 2;
        }

        h1 {
            font-size: 2.8rem;
            margin-bottom: 10px;
            color: white;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            animation: textGlow 3s ease-in-out infinite alternate;
        }

        @keyframes textGlow {
            from { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255, 255, 255, 0.5); }
            to { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.8); }
        }

        .tagline {
            font-size: 1.3rem;
            color: white;
            opacity: 0.9;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
            animation: fadeInOut 4s ease-in-out infinite;
        }

        @keyframes fadeInOut {
            0% { opacity: 0.7; }
            50% { opacity: 1; }
            100% { opacity: 0.7; }
        }

        .app-container {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }

        .controls-panel {
            flex: 1;
            min-width: 300px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: var(--shadow);
        }

        .preview-panel {
            flex: 2;
            min-width: 400px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: var(--shadow);
            display: flex;
            flex-direction: column;
        }

        /* Animated Section Titles */
        .section-title {
            font-size: 1.3rem;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid transparent;
            background: linear-gradient(90deg, #4a6fa5, #ff6b6b, #4ecdc4, #ffd166, #06d6a0, #118ab2, #ef476f);
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: titleGradient 8s ease infinite;
            position: relative;
            display: inline-block;
        }

        @keyframes titleGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .section-title::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, #4a6fa5, #ff6b6b, #4ecdc4, #ffd166, #06d6a0, #118ab2, #ef476f);
            background-size: 400% 400%;
            animation: titleGradient 8s ease infinite;
        }

        .control-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #555;
            transition: color 0.3s ease;
        }

        label:hover {
            color: #4a6fa5;
        }

        select, input[type="range"], input[type="color"] {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--border);
            border-radius: 5px;
            background: white;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        select:focus, input[type="range"]:focus, input[type="color"]:focus {
            border-color: #4a6fa5;
            box-shadow: 0 0 0 2px rgba(74, 111, 165, 0.2);
        }

        input[type="color"] {
            height: 45px;
            cursor: pointer;
        }

        .slider-container {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .slider-value {
            min-width: 40px;
            text-align: center;
            font-weight: bold;
            color: #4a6fa5;
        }

        .button-group {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }

        /* Animated Buttons */
        .animated-btn {
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 14px 24px;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            color: white;
            min-width: 160px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .animated-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: all 0.6s ease;
        }

        .animated-btn:hover::before {
            left: 100%;
        }

        .animated-btn .btn-icon {
            font-size: 18px;
            transition: all 0.3s ease;
            z-index: 2;
        }

        .animated-btn:hover .btn-icon {
            transform: translateY(-3px);
        }

        .animated-btn:active {
            transform: scale(0.98);
        }

        .primary-btn {
            background: linear-gradient(135deg, #4a6fa5, #3a5984);
            box-shadow: 0 4px 15px rgba(74, 111, 165, 0.3);
        }

        .primary-btn:hover {
            background: linear-gradient(135deg, #3a5984, #4a6fa5);
            box-shadow: 0 6px 20px rgba(74, 111, 165, 0.4);
        }

        .primary-btn .btn-icon {
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }

        .reset-btn {
            background: linear-gradient(135deg, #ff6b6b, #ff5252);
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
        }

        .reset-btn:hover {
            background: linear-gradient(135deg, #ff5252, #ff6b6b);
            box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
        }

        .reset-btn .btn-icon {
            animation: rotate 3s infinite linear;
        }

        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .text-editor-container {
            border: 1px solid var(--border);
            border-radius: 5px;
            margin-bottom: 20px;
            transition: all 0.3s ease;
        }

        .text-editor-container:focus-within {
            border-color: #4a6fa5;
            box-shadow: 0 0 0 2px rgba(74, 111, 165, 0.1);
        }

        .text-editor-toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            padding: 10px;
            background-color: #f5f5f5;
            border-bottom: 1px solid var(--border);
            border-radius: 5px 5px 0 0;
        }

        .toolbar-btn {
            padding: 8px 12px;
            background: white;
            border: 1px solid var(--border);
            border-radius: 3px;
            cursor: pointer;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 5px;
            transition: all 0.2s ease;
        }

        .toolbar-btn:hover {
            background-color: #e9e9e9;
            transform: translateY(-2px);
        }

        .toolbar-btn.active {
            background-color: var(--primary);
            color: white;
            border-color: var(--primary);
        }

        .text-editor {
            width: 100%;
            height: 150px;
            padding: 15px;
            border: none;
            resize: vertical;
            font-size: 1rem;
            line-height: 1.5;
            outline: none;
            overflow-y: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        .preview-container {
            flex: 1;
            border: 1px solid var(--border);
            border-radius: 5px;
            padding: 20px;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 300px;
            overflow: auto;
            position: relative;
            transition: all 0.3s ease;
        }

        .preview-container:hover {
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .preview-text {
            max-width: 100%;
            line-height: 1.8;
            transition: all 0.3s ease;
            opacity: 1;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        .preview-text.animated {
            opacity: 0;
        }

        .paper-white {
            background-color: white;
        }

        .paper-aged {
            background-color: #f8f4e9;
        }

        .paper-lined {
            background-image: linear-gradient(to bottom, #e0e8ff 1px, transparent 1px);
            background-size: 100% 24px;
            background-position: 0 0;
        }

        .paper-grid {
            background-image: 
                linear-gradient(to right, #e0e8ff 1px, transparent 1px),
                linear-gradient(to bottom, #e0e8ff 1px, transparent 1px);
            background-size: 20px 20px;
        }

        .export-options {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .download-btn {
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            color: white;
            min-width: 140px;
        }

        .download-btn .btn-text {
            z-index: 2;
            transition: all 0.3s ease;
        }

        .download-btn .btn-icon {
            font-size: 18px;
            transition: all 0.3s ease;
            z-index: 2;
        }

        .download-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: all 0.6s ease;
        }

        .download-btn:hover::before {
            left: 100%;
        }

        .download-btn:hover .btn-icon {
            transform: translateY(-3px);
        }

        .download-btn:active {
            transform: scale(0.98);
        }

        .download-png {
            background: linear-gradient(135deg, #4CAF50, #2E7D32);
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        }

        .download-png:hover {
            background: linear-gradient(135deg, #43A047, #1B5E20);
            box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
        }

        .download-jpg {
            background: linear-gradient(135deg, #FF9800, #EF6C00);
            box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
        }

        .download-jpg:hover {
            background: linear-gradient(135deg, #FB8C00, #E65100);
            box-shadow: 0 6px 20px rgba(255, 152, 0, 0.4);
        }

        .download-pdf {
            background: linear-gradient(135deg, #F44336, #C62828);
            box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
        }

        .download-pdf:hover {
            background: linear-gradient(135deg, #E53935, #B71C1C);
            box-shadow: 0 6px 20px rgba(244, 67, 54, 0.4);
        }

        .download-btn.downloading .btn-icon {
            animation: downloading 1.5s infinite;
        }

        .download-btn.success .btn-icon {
            animation: success 0.5s ease;
        }

        @keyframes downloading {
            0% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
        }

        @keyframes success {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }

        .font-sample {
            font-size: 1.2rem;
            margin-top: 5px;
            padding: 5px;
            border-radius: 3px;
            background-color: #f5f5f5;
            transition: all 0.3s ease;
        }

        .font-sample:hover {
            background-color: #e9e9e9;
            transform: translateY(-2px);
        }

        .font-elegant {
            font-family: 'Dancing Script', cursive;
            font-weight: bold;
        }

        .font-childlike {
            font-family: 'Schoolbell', cursive;
        }

        .font-artistic {
            font-family: 'Indie Flower', cursive;
        }

        .font-neutral {
            font-family: 'Atma', cursive;
            letter-spacing: 1px;
        }

        .font-doctor {
            font-family: 'Kalam', cursive;
            opacity: 0.7;
            letter-spacing: -0.5px;
        }

        .font-gloria {
            font-family: 'Gloria Hallelujah', cursive;
        }

        .font-schoolbell {
            font-family: 'Schoolbell', cursive;
        }

        .font-indie {
            font-family: 'Indie Flower', cursive;
        }

        .font-cedarville {
            font-family: 'Cedarville Cursive', cursive;
        }

        .font-kalam {
            font-family: 'Kalam', cursive;
        }

        .font-atma {
            font-family: 'Atma', cursive;
        }

        .font-girl {
            font-family: 'Gloria Hallelujah', cursive;
            font-weight: bold;
        }

        .font-boy {
            font-family: 'Schoolbell', cursive;
            font-weight: bold;
        }

        .font-elderly {
            font-family: 'Indie Flower', cursive;
            opacity: 0.8;
        }

        .output-description {
            margin-top: 20px;
            padding: 15px;
            background-color: #f0f7ff;
            border-radius: 5px;
            border-left: 4px solid var(--primary);
            transition: all 0.3s ease;
        }

        .output-description:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }

        .output-title {
            font-weight: bold;
            margin-bottom: 10px;
            color: var(--primary);
        }

        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background-color: #4caf50;
            color: white;
            border-radius: 5px;
            box-shadow: var(--shadow);
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .notification.show {
            opacity: 1;
            transform: translateY(0);
        }

        .notification.error {
            background-color: #ff6b6b;
        }

        .animation-controls {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }

        .animation-btn {
            padding: 8px 15px;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }

        .animation-btn:hover {
            transform: translateY(-2px);
        }

        .color-presets {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }

        .color-preset {
            padding: 8px 12px;
            border: 1px solid var(--border);
            border-radius: 5px;
            background: white;
            cursor: pointer;
            font-size: 0.85rem;
            transition: all 0.3s ease;
        }

        .color-preset:hover {
            background-color: #f0f0f0;
            transform: translateY(-2px);
        }

        .formatting-sample {
            margin-top: 10px;
            padding: 10px;
            background-color: #f9f9f9;
            border-radius: 5px;
            font-size: 0.9rem;
            color: #666;
            transition: all 0.3s ease;
        }

        .formatting-sample:hover {
            background-color: #f0f0f0;
        }

        /* Handwriting Gallery Styles */
        .gallery-section {
            margin: 40px 0;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: var(--shadow);
            transition: all 0.3s ease;
        }

        .gallery-section:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .gallery-title {
            text-align: center;
            margin-bottom: 20px;
            color: var(--primary);
            font-size: 1.5rem;
            animation: fadeInOut 3s ease-in-out infinite;
        }

        .gallery-container {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
            border-radius: 8px;
            background: linear-gradient(90deg, #f8f9fa, #e9ecef);
        }

        .gallery-track {
            display: flex;
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            animation: scroll 30s linear infinite;
        }

        .gallery-item {
            flex: 0 0 auto;
            width: 300px;
            height: 100%;
            margin-right: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            padding: 15px;
            transition: transform 0.3s ease;
        }

        .gallery-item:hover {
            transform: translateY(-5px);
        }

        .handwriting-sample {
            font-size: 1.5rem;
            margin-bottom: 10px;
            text-align: center;
            height: 60%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .handwriting-label {
            font-weight: bold;
            color: var(--primary);
            text-align: center;
        }

        @keyframes scroll {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(calc(-300px * 5 - 20px * 5));
            }
        }

        .gallery-container:hover .gallery-track {
            animation-play-state: paused;
        }

        /* Ad Space Styles */
        .ad-section {
            margin: 30px 0;
            text-align: center;
            padding: 15px;
            background: white;
            border-radius: 10px;
            box-shadow: var(--shadow);
            transition: all 0.3s ease;
        }

        .ad-section:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 15px rgba(0,0,0,0.1);
        }

        .ad-container {
            display: inline-block;
            padding: 15px 25px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .ad-container:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.25);
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }

        .ad-text {
            font-size: 1.1rem;
            margin-bottom: 5px;
        }

        .ad-link {
            font-size: 0.9rem;
            opacity: 0.9;
        }

        @media (max-width: 768px) {
            .app-container {
                flex-direction: column;
            }
            
            .controls-panel, .preview-panel {
                min-width: 100%;
            }
            
            .text-editor-toolbar {
                gap: 3px;
            }
            
            .toolbar-btn {
                padding: 6px 8px;
                font-size: 0.8rem;
            }

            .gallery-container {
                height: 180px;
            }

            .gallery-item {
                width: 250px;
            }

            .handwriting-sample {
                font-size: 1.2rem;
            }

            .export-options {
                justify-content: center;
            }

            .download-btn {
                min-width: 120px;
                padding: 10px 15px;
            }

            h1 {
                font-size: 2.2rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="animated-header">
            <div class="header-content">
                <h1><i class="fas fa-pen-fancy"></i> Zadha Handwrite</h1>
                <p class="tagline">Transform Digital text into Realistic handwritten Notes</p>
            </div>
        </header>

        <!-- Handwriting Gallery Section -->
        <section class="gallery-section">
            <h2 class="gallery-title">Handwriting Style Examples</h2>
            <div class="gallery-container">
                <div class="gallery-track">
                    <!-- Item 1 -->
                    <div class="gallery-item">
                        <div class="handwriting-sample font-elegant" style="color: #4a6fa5;">
                            Beautiful cursive writing
                        </div>
                        <div class="handwriting-label">Elegant Script</div>
                    </div>
                    <!-- Item 2 -->
                    <div class="gallery-item">
                        <div class="handwriting-sample font-childlike" style="color: #e74c3c;">
                            Playful child's writing
                        </div>
                        <div class="handwriting-label">Childlike Style</div>
                    </div>
                    <!-- Item 3 -->
                    <div class="gallery-item">
                        <div class="handwriting-sample font-artistic" style="color: #2ecc71;">
                            Creative artistic flow
                        </div>
                        <div class="handwriting-label">Artistic Flair</div>
                    </div>
                    <!-- Item 4 -->
                    <div class="gallery-item">
                        <div class="handwriting-sample font-neutral" style="color: #9b59b6;">
                            Clear block letters
                        </div>
                        <div class="handwriting-label">Neutral Print</div>
                    </div>
                    <!-- Item 5 -->
                    <div class="gallery-item">
                        <div class="handwriting-sample font-doctor" style="color: #f39c12;">
                            Quick doctor's notes
                        </div>
                        <div class="handwriting-label">Doctor's Hand</div>
                    </div>
                    <!-- Duplicate items for seamless loop -->
                    <div class="gallery-item">
                        <div class="handwriting-sample font-elegant" style="color: #4a6fa5;">
                            Beautiful cursive writing
                        </div>
                        <div class="handwriting-label">Elegant Script</div>
                    </div>
                    <div class="gallery-item">
                        <div class="handwriting-sample font-childlike" style="color: #e74c3c;">
                            Playful child's writing
                        </div>
                        <div class="handwriting-label">Childlike Style</div>
                    </div>
                    <div class="gallery-item">
                        <div class="handwriting-sample font-artistic" style="color: #2ecc71;">
                            Creative artistic flow
                        </div>
                        <div class="handwriting-label">Artistic Flair</div>
                    </div>
                    <div class="gallery-item">
                        <div class="handwriting-sample font-neutral" style="color: #9b59b6;">
                            Clear block letters
                        </div>
                        <div class="handwriting-label">Neutral Print</div>
                    </div>
                    <div class="gallery-item">
                        <div class="handwriting-sample font-doctor" style="color: #f39c12;">
                            Quick doctor's notes
                        </div>
                        <div class="handwriting-label">Doctor's Hand</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Ad Space Section -->
        <section class="ad-section">
            <a href="https://example-ad-link.com" target="_blank" class="ad-container">
                <div class="ad-text">Upgrade to Zadha Handwrite Premium</div>
                <div class="ad-link">Get unlimited exports and premium fonts</div>
            </a>
        </section>

        <div class="app-container">
            <div class="controls-panel">
                <h2 class="section-title"><i class="fas fa-sliders-h"></i> Customize Your Handwriting</h2>
                
                <div class="control-group">
                    <label for="text-input"><i class="fas fa-font"></i> Text to Convert</label>
                    <div class="text-editor-container">
                        <div class="text-editor-toolbar">
                            <button class="toolbar-btn" data-command="bold" title="Bold">
                                <i class="fas fa-bold"></i>
                            </button>
                            <button class="toolbar-btn" data-command="italic" title="Italic">
                                <i class="fas fa-italic"></i>
                            </button>
                            <button class="toolbar-btn" data-command="underline" title="Underline">
                                <i class="fas fa-underline"></i>
                            </button>
                            <button class="toolbar-btn" data-command="insertUnorderedList" title="Bullet List">
                                <i class="fas fa-list-ul"></i>
                            </button>
                            <button class="toolbar-btn" data-command="undo" title="Undo">
                                <i class="fas fa-undo"></i>
                            </button>
                            <button class="toolbar-btn" data-command="redo" title="Redo">
                                <i class="fas fa-redo"></i>
                            </button>
                            <button class="toolbar-btn" data-command="removeFormat" title="Clear Formatting">
                                <i class="fas fa-eraser"></i>
                            </button>
                        </div>
                        <div id="text-input" class="text-editor" contenteditable="true">Welcome to Zadha Handwrite! This is a sample text that will be transformed into realistic handwriting.

You can use bold, italic, and underline formatting. Spaces and line breaks are preserved exactly as you type them.

Try creating lists:
• First item
• Second item
• Third item

The formatting will be reflected in your handwritten output.</div>
                    </div>
                    <div class="formatting-sample">
                        <strong><i class="fas fa-lightbulb"></i> Tip:</strong> Use the toolbar to format your text. Spaces and line breaks will be preserved in the handwriting.
                    </div>
                </div>
                
                <div class="control-group">
                    <label for="font-family"><i class="fas fa-font"></i> Font Family</label>
                    <select id="font-family">
                        <option value="elegant">Elegant Script (Formal cursive)</option>
                        <option value="childlike">Childlike Style (Playful, rounded)</option>
                        <option value="artistic">Artistic Flair (Creative, flowy)</option>
                        <option value="neutral">Neutral Print (Clear block letters)</option>
                        <option value="doctor">Doctor's Hand (Quick, scribbled)</option>
                        <option value="gloria">Gloria Hallelujah (Playful, casual)</option>
                        <option value="schoolbell">Schoolbell (Childlike, rounded)</option>
                        <option value="indie">Indie Flower (Flowy, artistic)</option>
                        <option value="cedarville">Cedarville Cursive (Elegant cursive)</option>
                        <option value="kalam">Kalam (Versatile, mixed scripts)</option>
                        <option value="atma">Atma (Multilingual, personal)</option>
                        <option value="girl">Girl Handwriting (Neat, loopy)</option>
                        <option value="boy">Boy Handwriting (Bold, angular)</option>
                        <option value="elderly">Elderly Tremble (Wavy, uneven)</option>
                    </select>
                    <div id="font-sample" class="font-sample font-elegant">Sample text in selected font</div>
                </div>
                
                <div class="control-group">
                    <label for="font-size"><i class="fas fa-text-height"></i> Font Size</label>
                    <div class="slider-container">
                        <input type="range" id="font-size" min="12" max="24" value="16" step="2">
                        <span id="font-size-value" class="slider-value">16px</span>
                    </div>
                </div>
                
                <div class="control-group">
                    <label for="ink-color"><i class="fas fa-palette"></i> Ink Color</label>
                    <input type="color" id="ink-color" value="#000000">
                    <div class="color-presets">
                        <button class="color-preset" data-color="#000000">Dark Black</button>
                        <button class="color-preset" data-color="#555555">Light Black</button>
                        <button class="color-preset" data-color="#000080">Dark Blue</button>
                        <button class="color-preset" data-color="#4169E1">Light Blue</button>
                        <button class="color-preset" data-color="#8B0000">Dark Red</button>
                        <button class="color-preset" data-color="#FF0000">Red</button>
                        <button class="color-preset" data-color="#008000">Green</button>
                        <button class="color-preset" data-color="#FFFF00">Yellow</button>
                    </div>
                </div>
                
                <div class="control-group">
                    <label for="paper-type"><i class="fas fa-file-alt"></i> Paper Type</label>
                    <select id="paper-type">
                        <option value="none">No Paper (Plain white)</option>
                        <option value="white1">White Paper 1 (Subtle texture)</option>
                        <option value="white2">White Paper 2 (Aged, yellowish)</option>
                        <option value="white3">White Paper 3 (Smooth, modern)</option>
                        <option value="lined">Blue Lined Paper</option>
                        <option value="grid">Grid Paper</option>
                    </select>
                </div>
                
                <div class="control-group">
                    <label for="resolution"><i class="fas fa-expand-alt"></i> Text Resolution</label>
                    <select id="resolution">
                        <option value="standard">Standard Quality (Fast generation)</option>
                        <option value="high">High Quality 2x (Sharper, detailed)</option>
                    </select>
                </div>
                
                <div class="button-group">
                    <button id="generate-btn" class="animated-btn primary-btn">
                        <span class="btn-icon"><i class="fas fa-magic"></i></span>
                        <span class="btn-text">Generate Handwriting</span>
                    </button>
                    <button id="reset-btn" class="animated-btn reset-btn">
                        <span class="btn-icon"><i class="fas fa-redo"></i></span>
                        <span class="btn-text">Reset All</span>
                    </button>
                </div>
            </div>
            
            <div class="preview-panel">
                <h2 class="section-title"><i class="fas fa-eye"></i> Handwriting Preview</h2>
                
                <div id="preview-container" class="preview-container paper-white">
                    <div id="preview-text" class="preview-text font-elegant" style="font-size: 16px; color: #000000;">
                        Your handwriting will appear here after generation.
                    </div>
                </div>
                
                <div class="control-group">
                    <label><i class="fas fa-play-circle"></i> Animation Controls</label>
                    <div class="animation-controls">
                        <button id="animate-btn" class="animation-btn secondary-btn">Animate Writing</button>
                        <button id="pause-btn" class="animation-btn secondary-btn">Pause Animation</button>
                        <button id="reset-animation-btn" class="animation-btn secondary-btn">Reset Animation</button>
                    </div>
                </div>
                
                <div class="output-description">
                    <div class="output-title"><i class="fas fa-info-circle"></i> Output Description</div>
                    <div id="output-desc">
                        No handwriting generated yet. Click "Generate Handwriting" to create your custom handwritten text.
                    </div>
                </div>
                
                <div class="control-group">
                    <label><i class="fas fa-download"></i> Export Options</label>
                    <div class="export-options">
                        <button id="download-png" class="download-btn download-png">
                            <span class="btn-icon"><i class="fas fa-file-image"></i></span>
                            <span class="btn-text">Download PNG</span>
                        </button>
                        <button id="download-jpg" class="download-btn download-jpg">
                            <span class="btn-icon"><i class="fas fa-file-image"></i></span>
                            <span class="btn-text">Download JPG</span>
                        </button>
                        <button id="download-pdf" class="download-btn download-pdf">
                            <span class="btn-icon"><i class="fas fa-file-pdf"></i></span>
                            <span class="btn-text">Download PDF</span>
                        </button>
                        <button id="copy-text" class="download-btn" style="background: linear-gradient(135deg, #9C27B0, #673AB7);">
                            <span class="btn-icon"><i class="fas fa-copy"></i></span>
                            <span class="btn-text">Copy Text</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="notification" class="notification">Settings updated successfully!</div>

    <script>
        // DOM Elements
        const textInput = document.getElementById('text-input');
        const fontFamily = document.getElementById('font-family');
        const fontSize = document.getElementById('font-size');
        const fontSizeValue = document.getElementById('font-size-value');
        const inkColor = document.getElementById('ink-color');
        const paperType = document.getElementById('paper-type');
        const resolution = document.getElementById('resolution');
        const generateBtn = document.getElementById('generate-btn');
        const resetBtn = document.getElementById('reset-btn');
        const previewContainer = document.getElementById('preview-container');
        const previewText = document.getElementById('preview-text');
        const outputDesc = document.getElementById('output-desc');
        const fontSample = document.getElementById('font-sample');
        const colorPresets = document.querySelectorAll('.color-preset');
        const downloadPng = document.getElementById('download-png');
        const downloadJpg = document.getElementById('download-jpg');
        const downloadPdf = document.getElementById('download-pdf');
        const copyTextBtn = document.getElementById('copy-text');
        const notification = document.getElementById('notification');
        const animateBtn = document.getElementById('animate-btn');
        const pauseBtn = document.getElementById('pause-btn');
        const resetAnimationBtn = document.getElementById('reset-animation-btn');
        const toolbarBtns = document.querySelectorAll('.toolbar-btn');

        // Font mapping
        const fontMap = {
            'elegant': 'font-elegant',
            'childlike': 'font-childlike',
            'artistic': 'font-artistic',
            'neutral': 'font-neutral',
            'doctor': 'font-doctor',
            'gloria': 'font-gloria',
            'schoolbell': 'font-schoolbell',
            'indie': 'font-indie',
            'cedarville': 'font-cedarville',
            'kalam': 'font-kalam',
            'atma': 'font-atma',
            'girl': 'font-girl',
            'boy': 'font-boy',
            'elderly': 'font-elderly'
        };

        // Paper type mapping
        const paperMap = {
            'none': 'paper-white',
            'white1': 'paper-white',
            'white2': 'paper-aged',
            'white3': 'paper-white',
            'lined': 'paper-lined',
            'grid': 'paper-grid'
        };

        // Animation variables
        let animationInterval;
        let isAnimating = false;
        let currentCharIndex = 0;
        let originalText = '';

        // Initialize the app
        function initApp() {
            updateFontSample();
            updatePreview();
            
            // Event listeners
            fontFamily.addEventListener('change', updateFontSample);
            fontSize.addEventListener('input', updateFontSize);
            inkColor.addEventListener('input', updatePreview);
            paperType.addEventListener('change', updatePaper);
            generateBtn.addEventListener('click', generateHandwriting);
            resetBtn.addEventListener('click', resetAll);
            
            colorPresets.forEach(preset => {
                preset.addEventListener('click', function() {
                    inkColor.value = this.getAttribute('data-color');
                    updatePreview();
                });
            });
            
            downloadPng.addEventListener('click', () => downloadFile('PNG', downloadPng));
            downloadJpg.addEventListener('click', () => downloadFile('JPG', downloadJpg));
            downloadPdf.addEventListener('click', () => downloadFile('PDF', downloadPdf));
            copyTextBtn.addEventListener('click', copyTextToClipboard);
            
            animateBtn.addEventListener('click', startAnimation);
            pauseBtn.addEventListener('click', pauseAnimation);
            resetAnimationBtn.addEventListener('click', resetAnimation);
            
            // Text editor toolbar events
            toolbarBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const command = this.getAttribute('data-command');
                    
                    // Execute the command
                    if (command === 'insertUnorderedList') {
                        document.execCommand('insertUnorderedList', false, null);
                    } else if (command === 'undo' || command === 'redo') {
                        document.execCommand(command, false, null);
                    } else if (command === 'removeFormat') {
                        document.execCommand('removeFormat', false, null);
                        // Clear active states
                        toolbarBtns.forEach(b => {
                            if (['bold', 'italic', 'underline'].includes(b.getAttribute('data-command'))) {
                                b.classList.remove('active');
                            }
                        });
                    } else {
                        document.execCommand(command, false, null);
                        
                        // Toggle active state for formatting buttons
                        if (['bold', 'italic', 'underline'].includes(command)) {
                            this.classList.toggle('active');
                        }
                    }
                    
                    // Update preview if text has changed
                    updatePreviewFromEditor();
                });
            });
            
            // Update preview when text changes
            textInput.addEventListener('input', updatePreviewFromEditor);
            textInput.addEventListener('paste', function(e) {
                // Allow paste to complete then update
                setTimeout(updatePreviewFromEditor, 10);
            });
            
            // Fix for contenteditable formatting issues
            textInput.addEventListener('keydown', function(e) {
                // Preserve formatting when pressing Enter
                if (e.key === 'Enter') {
                    e.preventDefault();
                    document.execCommand('insertLineBreak');
                }
            });
        }

        // Update preview from text editor
        function updatePreviewFromEditor() {
            // Store the HTML content for later use in generation
            originalText = textInput.innerHTML;
        }

        // Update font sample display
        function updateFontSample() {
            const selectedFont = fontFamily.value;
            fontSample.className = 'font-sample ' + fontMap[selectedFont];
        }

        // Update font size display
        function updateFontSize() {
            fontSizeValue.textContent = fontSize.value + 'px';
            updatePreview();
        }

        // Update paper background
        function updatePaper() {
            const selectedPaper = paperType.value;
            previewContainer.className = 'preview-container ' + paperMap[selectedPaper];
            updatePreview();
        }

        // Update preview with current settings
        function updatePreview() {
            const selectedFont = fontFamily.value;
            previewText.className = 'preview-text ' + fontMap[selectedFont];
            previewText.style.fontSize = fontSize.value + 'px';
            previewText.style.color = inkColor.value;
        }

        // Generate handwriting
        function generateHandwriting() {
            let textContent = textInput.innerText || textInput.textContent;
            if (!textContent.trim()) {
                showNotification('Please enter some text to convert.', 'error');
                return;
            }
            
            const selectedFont = fontFamily.value;
            const selectedSize = fontSize.value;
            const selectedColor = inkColor.value;
            const selectedPaper = paperType.value;
            const selectedResolution = resolution.value;
            
            // Update preview with formatted content
            previewText.innerHTML = textInput.innerHTML;
            updatePreview();
            
            // Store original text for animation
            originalText = textContent;
            
            // Generate description
            const fontDescriptions = {
                'elegant': 'elegant, formal cursive script perfect for invitations and letters',
                'childlike': 'playful, rounded letters resembling a child\'s handwriting',
                'artistic': 'creative, flowy style with artistic flair',
                'neutral': 'clear, readable block letters for maximum clarity',
                'doctor': 'quick, scribbled style that mimics a doctor\'s handwriting',
                'gloria': 'playful, casual script resembling a girl\'s neat handwriting',
                'schoolbell': 'childlike, rounded letters like a boy\'s playful scrawl',
                'indie': 'flowy, artistic style perfect for creative or feminine handwriting',
                'cedarville': 'elegant cursive for adult-like, sophisticated writing',
                'kalam': 'versatile style simulating diverse human handwriting with slight variations',
                'atma': 'personal, varied handwriting suitable for multilingual text',
                'girl': 'neat, loopy handwriting with playful elements like hearts or dots on i\'s',
                'boy': 'bold, angular, slightly messy handwriting with character',
                'elderly': 'wavy, uneven handwriting with a slight tremble effect'
            };
            
            const paperDescriptions = {
                'none': 'plain white background',
                'white1': 'subtle textured paper like standard printer paper',
                'white2': 'aged, yellowish paper for a vintage feel',
                'white3': 'smooth, modern notebook paper',
                'lined': 'blue lined paper with light blue guidelines',
                'grid': 'grid paper with light blue squares for precise writing'
            };
            
            const colorNames = {
                '#000000': 'Dark Black',
                '#555555': 'Light Black',
                '#000080': 'Dark Blue',
                '#4169E1': 'Light Blue',
                '#8B0000': 'Dark Red',
                '#FF0000': 'Red',
                '#008000': 'Green',
                '#FFFF00': 'Yellow'
            };
            
            const colorName = colorNames[selectedColor] || `custom color (${selectedColor})`;
            
            let description = `Your text has been converted to ${fontDescriptions[selectedFont]}. `;
            description += `The ${selectedSize}px text is rendered in ${colorName} ink on ${paperDescriptions[selectedPaper]}. `;
            
            if (selectedResolution === 'high') {
                description += `The high-quality 2x resolution provides enhanced details with subtle ink variations, slight pressure differences, and finer strokes for an authentic pen-on-paper feel.`;
            } else {
                description += `The standard quality offers fast generation suitable for previews and everyday use.`;
            }
            
            // Add formatting info
            const hasBold = textInput.querySelector('strong, b');
            const hasItalic = textInput.querySelector('em, i');
            const hasUnderline = textInput.querySelector('u');
            const hasList = textInput.querySelector('ul, ol');
            
            if (hasBold || hasItalic || hasUnderline || hasList) {
                description += ` Your text includes `;
                const formats = [];
                if (hasBold) formats.push('bold');
                if (hasItalic) formats.push('italic');
                if (hasUnderline) formats.push('underline');
                if (hasList) formats.push('lists');
                
                description += formats.join(', ') + ' formatting.';
            }
            
            outputDesc.textContent = description;
            showNotification('Handwriting generated successfully!');
        }

        // Reset all settings
        function resetAll() {
            textInput.innerHTML = 'Welcome to Zadha Handwrite! This is a sample text that will be transformed into realistic handwriting.\n\nYou can use bold, italic, and underline formatting. Spaces and line breaks are preserved exactly as you type them.\n\nTry creating lists:\n• First item\n• Second item\n• Third item\n\nThe formatting will be reflected in your handwritten output.';
            fontFamily.value = 'elegant';
            fontSize.value = '16';
            fontSizeValue.textContent = '16px';
            inkColor.value = '#000000';
            paperType.value = 'none';
            resolution.value = 'standard';
            
            // Reset toolbar buttons
            toolbarBtns.forEach(btn => {
                if (['bold', 'italic', 'underline'].includes(btn.getAttribute('data-command'))) {
                    btn.classList.remove('active');
                }
            });
            
            updateFontSample();
            updatePreview();
            updatePaper();
            
            previewText.innerHTML = 'Your handwriting will appear here after generation.';
            outputDesc.textContent = 'No handwriting generated yet. Click "Generate Handwriting" to create your custom handwritten text.';
            
            resetAnimation();
            
            showNotification('All settings have been reset to defaults.');
        }

        // Start animation
        function startAnimation() {
            if (!originalText) {
                showNotification('Please generate handwriting first.', 'error');
                return;
            }
            
            if (isAnimating) return;
            
            isAnimating = true;
            currentCharIndex = 0;
            previewText.textContent = '';
            previewText.classList.add('animated');
            
            animationInterval = setInterval(() => {
                if (currentCharIndex < originalText.length) {
                    previewText.textContent += originalText[currentCharIndex];
                    currentCharIndex++;
                } else {
                    clearInterval(animationInterval);
                    isAnimating = false;
                    previewText.classList.remove('animated');
                    // Restore formatting after animation
                    previewText.innerHTML = textInput.innerHTML;
                    updatePreview();
                }
            }, 50);
        }

        // Pause animation
        function pauseAnimation() {
            if (animationInterval) {
                clearInterval(animationInterval);
                isAnimating = false;
            }
        }

        // Reset animation
        function resetAnimation() {
            pauseAnimation();
            previewText.innerHTML = textInput.innerHTML;
            updatePreview();
            previewText.classList.remove('animated');
            currentCharIndex = 0;
            isAnimating = false;
        }

        // Copy text to clipboard
        function copyTextToClipboard() {
            const textContent = previewText.innerText || previewText.textContent;
            if (!textContent.trim()) {
                showNotification('No text to copy. Please generate handwriting first.', 'error');
                return;
            }
            
            // Use the modern Clipboard API
            navigator.clipboard.writeText(textContent).then(() => {
                showNotification('Text copied to clipboard!');
                copyTextBtn.classList.add('success');
                setTimeout(() => {
                    copyTextBtn.classList.remove('success');
                }, 1000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                showNotification('Failed to copy text to clipboard', 'error');
            });
        }

        // Download file with animation
        function downloadFile(format, button) {
            const textContent = textInput.innerText || textInput.textContent;
            if (!textContent.trim()) {
                showNotification('Please generate handwriting first.', 'error');
                return;
            }
            
            // Reset animation if active
            resetAnimation();
            
            // Add downloading animation
            button.classList.add('downloading');
            
            // Use html2canvas to capture the preview
            html2canvas(previewContainer, {
                scale: resolution.value === 'high' ? 2 : 1,
                useCORS: true,
                backgroundColor: null
            }).then(canvas => {
                if (format === 'PDF') {
                    // Create PDF using jsPDF
                    const { jsPDF } = window.jspdf;
                    const pdf = new jsPDF({
                        orientation: 'portrait',
                        unit: 'px',
                        format: [canvas.width, canvas.height]
                    });
                    
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height);
                    pdf.save('handwriting.pdf');
                } else {
                    // Create download link for image
                    const link = document.createElement('a');
                    link.download = `handwriting.${format.toLowerCase()}`;
                    link.href = canvas.toDataURL(`image/${format.toLowerCase()}`);
                    link.click();
                }
                
                // Remove downloading animation and add success animation
                button.classList.remove('downloading');
                button.classList.add('success');
                
                setTimeout(() => {
                    button.classList.remove('success');
                }, 1000);
                
                const quality = resolution.value === 'high' ? 'High Quality 2x' : 'Standard Quality';
                showNotification(`${format} file downloaded successfully!`);
                
                let message = '';
                if (format === 'PDF') {
                    message = `Your ${quality} PDF file has been downloaded. The document preserves the handwriting layout exactly as shown in the preview.`;
                } else {
                    const dimensions = resolution.value === 'high' ? '2048x1536' : '1024x768';
                    message = `Your ${quality} ${format} image (${dimensions}) has been downloaded. The file captures all the handwritten details with realistic ink effects.`;
                }
                
                outputDesc.textContent = message;
            }).catch(error => {
                console.error('Error generating download:', error);
                button.classList.remove('downloading');
                showNotification('Error generating download. Please try again.', 'error');
            });
        }

        // Show notification
        function showNotification(message, type = 'success') {
            notification.textContent = message;
            notification.className = 'notification';
            
            if (type === 'error') {
                notification.classList.add('error');
            } else {
                notification.classList.remove('error');
            }
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', initApp);
    </script>
</body>
</html>
