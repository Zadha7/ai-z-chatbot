 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AffiliateHub - Premium Marketplace</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            box-sizing: border-box;
        }
        
        .carousel-container {
            overflow: hidden;
            position: relative;
        }
        
        .carousel-track {
            display: flex;
            animation: scroll-left 300s linear infinite;
            width: calc(320px * 200);
        }
        
        .carousel-item {
            flex-shrink: 0;
            width: 300px;
            height: 200px;
            margin-right: 20px;
        }
        
        @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-320px * 100)); }
        }
        
        .platform-logo {
            width: 50px;
            height: 50px;
            object-fit: contain;
        }
        
        .product-card {
            transition: all 0.3s ease;
        }
        
        .product-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            z-index: 1000;
        }
        
        .modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .fade-in {
            animation: fadeIn 0.6s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .gradient-text {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .platform-badge {
            position: relative;
            overflow: hidden;
        }
        
        .platform-badge::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s;
        }
        
        .platform-badge:hover::before {
            left: 100%;
        }
    </style>
</head>
<body class="bg-gray-50 min-h-full">
    <!-- Header -->
    <header class="bg-white shadow-xl sticky top-0 z-50 border-b-4 border-gradient-to-r from-blue-500 to-purple-600">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span class="text-white font-bold text-2xl">A</span>
                    </div>
                    <div>
                        <h1 class="text-3xl font-bold gradient-text">AffiliateHub</h1>
                        <p class="text-sm text-gray-500">Premium Marketplace</p>
                    </div>
                </div>
                <nav class="hidden md:flex space-x-8">
                    <a href="#home" class="text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</a>
                    <a href="#products" class="text-gray-600 hover:text-blue-600 transition-colors font-medium">Products</a>
                    <a href="#platforms" class="text-gray-600 hover:text-blue-600 transition-colors font-medium">Platforms</a>
                    <a href="#about" class="text-gray-600 hover:text-blue-600 transition-colors font-medium">About</a>
                </nav>
                <button onclick="openAddProductModal()" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg font-medium">
                    ✨ Add Product
                </button>
            </div>
        </div>
    </header>

    <!-- Hero Section with Moving Images -->
    <section id="home" class="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-24 relative overflow-hidden">
        <div class="absolute inset-0 bg-black opacity-20"></div>
        <div class="container mx-auto px-6 text-center relative z-10">
            <h2 class="text-6xl font-bold mb-8 leading-tight">Discover Amazing Deals</h2>
            <p class="text-2xl mb-12 max-w-3xl mx-auto opacity-90">Find the best products from top platforms with exclusive affiliate deals, discounts, and cashback offers</p>
            <div class="flex justify-center space-x-6">
                <button onclick="document.getElementById('products').scrollIntoView({behavior: 'smooth'})" class="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl">
                    🛍️ Shop Now
                </button>
                <button onclick="document.getElementById('platforms').scrollIntoView({behavior: 'smooth'})" class="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all">
                    🏪 View Platforms
                </button>
            </div>
        </div>
        
        <!-- Moving Images Carousel -->
        <div class="mt-20 carousel-container">
            <div class="carousel-track" id="imageCarousel">
                <!-- Images will be generated by JavaScript -->
            </div>
        </div>
    </section>

    <!-- Platform Logos Section -->
    <section id="platforms" class="py-20 bg-white">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h3 class="text-4xl font-bold gradient-text mb-4">Our Partner Platforms</h3>
                <p class="text-xl text-gray-600">Shop from the world's leading e-commerce platforms</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-12 items-center justify-items-center">
                <div class="flex flex-col items-center space-y-4 group">
                    <div class="platform-badge bg-gradient-to-r from-orange-400 to-orange-600 p-4 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all">
                        <svg class="platform-logo" viewBox="0 0 100 40" fill="none">
                            <rect width="100" height="40" fill="white" rx="8"/>
                            <text x="50" y="25" text-anchor="middle" fill="#FF9900" font-size="14" font-weight="bold">Amazon</text>
                        </svg>
                    </div>
                    <span class="text-lg font-bold text-gray-700">Amazon</span>
                    <p class="text-sm text-gray-500 text-center">Global marketplace with millions of products</p>
                </div>
                
                <div class="flex flex-col items-center space-y-4 group">
                    <div class="platform-badge bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all">
                        <svg class="platform-logo" viewBox="0 0 100 40" fill="none">
                            <rect width="100" height="40" fill="white" rx="8"/>
                            <text x="50" y="25" text-anchor="middle" fill="#FF6A00" font-size="14" font-weight="bold">Alibaba</text>
                        </svg>
                    </div>
                    <span class="text-lg font-bold text-gray-700">Alibaba</span>
                    <p class="text-sm text-gray-500 text-center">Wholesale and retail from China</p>
                </div>
                
                <div class="flex flex-col items-center space-y-4 group">
                    <div class="platform-badge bg-gradient-to-r from-yellow-400 to-orange-400 p-4 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all">
                        <svg class="platform-logo" viewBox="0 0 100 40" fill="none">
                            <rect width="100" height="40" fill="white" rx="8"/>
                            <text x="50" y="25" text-anchor="middle" fill="#FFD700" font-size="16" font-weight="bold">Temu</text>
                        </svg>
                    </div>
                    <span class="text-lg font-bold text-gray-700">Temu</span>
                    <p class="text-sm text-gray-500 text-center">Affordable products for everyone</p>
                </div>
                
                <div class="flex flex-col items-center space-y-4 group">
                    <div class="platform-badge bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all">
                        <svg class="platform-logo" viewBox="0 0 100 40" fill="none">
                            <rect width="100" height="40" fill="white" rx="8"/>
                            <text x="50" y="25" text-anchor="middle" fill="#5C6AC4" font-size="14" font-weight="bold">Shopify</text>
                        </svg>
                    </div>
                    <span class="text-lg font-bold text-gray-700">Shopify</span>
                    <p class="text-sm text-gray-500 text-center">Independent brand stores</p>
                </div>
                
                <div class="flex flex-col items-center space-y-4 group">
                    <div class="platform-badge bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all">
                        <svg class="platform-logo" viewBox="0 0 100 40" fill="none">
                            <rect width="100" height="40" fill="white" rx="8"/>
                            <text x="50" y="25" text-anchor="middle" fill="#F85606" font-size="16" font-weight="bold">Daraz</text>
                        </svg>
                    </div>
                    <span class="text-lg font-bold text-gray-700">Daraz</span>
                    <p class="text-sm text-gray-500 text-center">South Asia's leading platform</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Products Section -->
    <section id="products" class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row justify-between items-center mb-16 space-y-4 md:space-y-0">
                <div>
                    <h3 class="text-4xl font-bold gradient-text mb-2">Featured Products</h3>
                    <p class="text-xl text-gray-600">Handpicked deals with the best prices</p>
                </div>
                <div class="flex flex-wrap gap-4">
                    <select id="platformFilter" onchange="filterProducts()" class="px-6 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-lg">
                        <option value="">🌐 All Platforms</option>
                        <option value="amazon">🛒 Amazon</option>
                        <option value="alibaba">🏭 Alibaba</option>
                        <option value="temu">💰 Temu</option>
                        <option value="shopify">🏪 Shopify</option>
                        <option value="daraz">🛍️ Daraz</option>
                    </select>
                    <select id="categoryFilter" onchange="filterProducts()" class="px-6 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-lg">
                        <option value="">📂 All Categories</option>
                        <option value="electronics">📱 Electronics</option>
                        <option value="fashion">👕 Fashion</option>
                        <option value="home">🏠 Home & Garden</option>
                        <option value="sports">⚽ Sports</option>
                        <option value="books">📚 Books</option>
                        <option value="beauty">💄 Beauty</option>
                        <option value="automotive">🚗 Automotive</option>
                    </select>
                </div>
            </div>
            
            <div id="productsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <!-- Products will be populated by JavaScript -->
            </div>
        </div>
    </section>

    <!-- Add Product Modal -->
    <div id="addProductModal" class="modal">
        <div class="bg-white rounded-2xl p-8 max-w-3xl w-full mx-4 max-h-full overflow-y-auto shadow-2xl">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h3 class="text-3xl font-bold gradient-text">Add New Product</h3>
                    <p class="text-gray-600">Create a new affiliate product listing</p>
                </div>
                <button onclick="closeAddProductModal()" class="text-gray-400 hover:text-gray-600 text-3xl font-bold">&times;</button>
            </div>
            
            <form id="addProductForm" onsubmit="addProduct(event)" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="productName" class="block text-sm font-bold text-gray-700 mb-3">Product Name *</label>
                        <input type="text" id="productName" required class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    </div>
                    
                    <div>
                        <label for="productBrand" class="block text-sm font-bold text-gray-700 mb-3">Brand</label>
                        <input type="text" id="productBrand" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    </div>
                </div>
                
                <div>
                    <label for="productDescription" class="block text-sm font-bold text-gray-700 mb-3">Description *</label>
                    <textarea id="productDescription" rows="4" required class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"></textarea>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label for="productPrice" class="block text-sm font-bold text-gray-700 mb-3">Current Price ($) *</label>
                        <input type="number" id="productPrice" step="0.01" required class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    </div>
                    
                    <div>
                        <label for="productOriginalPrice" class="block text-sm font-bold text-gray-700 mb-3">Original Price ($)</label>
                        <input type="number" id="productOriginalPrice" step="0.01" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    </div>
                    
                    <div>
                        <label for="productRating" class="block text-sm font-bold text-gray-700 mb-3">Rating (1-5)</label>
                        <input type="number" id="productRating" min="1" max="5" step="0.1" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="productPlatform" class="block text-sm font-bold text-gray-700 mb-3">Platform *</label>
                        <select id="productPlatform" required class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                            <option value="">Select Platform</option>
                            <option value="amazon">Amazon</option>
                            <option value="alibaba">Alibaba</option>
                            <option value="temu">Temu</option>
                            <option value="shopify">Shopify</option>
                            <option value="daraz">Daraz</option>
                        </select>
                    </div>
                    
                    <div>
                        <label for="productCategory" class="block text-sm font-bold text-gray-700 mb-3">Category *</label>
                        <select id="productCategory" required class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                            <option value="">Select Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="fashion">Fashion</option>
                            <option value="home">Home & Garden</option>
                            <option value="sports">Sports</option>
                            <option value="books">Books</option>
                            <option value="beauty">Beauty</option>
                            <option value="automotive">Automotive</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <label for="productImage" class="block text-sm font-bold text-gray-700 mb-3">Product Image URL</label>
                    <input type="url" id="productImage" placeholder="https://example.com/image.jpg" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                </div>
                
                <div>
                    <label for="affiliateLink" class="block text-sm font-bold text-gray-700 mb-3">Affiliate Link *</label>
                    <input type="url" id="affiliateLink" required placeholder="https://affiliate-link.com" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                </div>
                
                <div class="flex justify-end space-x-4 pt-6">
                    <button type="button" onclick="closeAddProductModal()" class="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium">
                        Cancel
                    </button>
                    <button type="submit" class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg">
                        ✨ Add Product
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Edit Product Modal -->
    <div id="editProductModal" class="modal">
        <div class="bg-white rounded-2xl p-8 max-w-3xl w-full mx-4 max-h-full overflow-y-auto shadow-2xl">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h3 class="text-3xl font-bold gradient-text">Edit Product</h3>
                    <p class="text-gray-600">Update product information</p>
                </div>
                <button onclick="closeEditProductModal()" class="text-gray-400 hover:text-gray-600 text-3xl font-bold">&times;</button>
            </div>
            
            <form id="editProductForm" onsubmit="updateProduct(event)" class="space-y-6">
                <input type="hidden" id="editProductId">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="editProductName" class="block text-sm font-bold text-gray-700 mb-3">Product Name *</label>
                        <input type="text" id="editProductName" required class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    </div>
                    
                    <div>
                        <label for="editProductBrand" class="block text-sm font-bold text-gray-700 mb-3">Brand</label>
                        <input type="text" id="editProductBrand" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    </div>
                </div>
                
                <div>
                    <label for="editProductDescription" class="block text-sm font-bold text-gray-700 mb-3">Description *</label>
                    <textarea id="editProductDescription" rows="4" required class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"></textarea>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label for="editProductPrice" class="block text-sm font-bold text-gray-700 mb-3">Current Price ($) *</label>
                        <input type="number" id="editProductPrice" step="0.01" required class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    </div>
                    
                    <div>
                        <label for="editProductOriginalPrice" class="block text-sm font-bold text-gray-700 mb-3">Original Price ($)</label>
                        <input type="number" id="editProductOriginalPrice" step="0.01" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    </div>
                    
                    <div>
                        <label for="editProductRating" class="block text-sm font-bold text-gray-700 mb-3">Rating (1-5)</label>
                        <input type="number" id="editProductRating" min="1" max="5" step="0.1" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="editProductPlatform" class="block text-sm font-bold text-gray-700 mb-3">Platform *</label>
                        <select id="editProductPlatform" required class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                            <option value="">Select Platform</option>
                            <option value="amazon">Amazon</option>
                            <option value="alibaba">Alibaba</option>
                            <option value="temu">Temu</option>
                            <option value="shopify">Shopify</option>
                            <option value="daraz">Daraz</option>
                        </select>
                    </div>
                    
                    <div>
                        <label for="editProductCategory" class="block text-sm font-bold text-gray-700 mb-3">Category *</label>
                        <select id="editProductCategory" required class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                            <option value="">Select Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="fashion">Fashion</option>
                            <option value="home">Home & Garden</option>
                            <option value="sports">Sports</option>
                            <option value="books">Books</option>
                            <option value="beauty">Beauty</option>
                            <option value="automotive">Automotive</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <label for="editProductImage" class="block text-sm font-bold text-gray-700 mb-3">Product Image URL</label>
                    <input type="url" id="editProductImage" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                </div>
                
                <div>
                    <label for="editAffiliateLink" class="block text-sm font-bold text-gray-700 mb-3">Affiliate Link *</label>
                    <input type="url" id="editAffiliateLink" required class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                </div>
                
                <div class="flex justify-end space-x-4 pt-6">
                    <button type="button" onclick="closeEditProductModal()" class="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium">
                        Cancel
                    </button>
                    <button type="submit" class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg">
                        💾 Update Product
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-gray-900 to-black text-white py-16">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div>
                    <div class="flex items-center space-x-4 mb-6">
                        <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <span class="text-white font-bold text-xl">A</span>
                        </div>
                        <div>
                            <h4 class="text-2xl font-bold">AffiliateHub</h4>
                            <p class="text-gray-400 text-sm">Premium Marketplace</p>
                        </div>
                    </div>
                    <p class="text-gray-400 leading-relaxed">Your trusted affiliate marketplace for the best deals across multiple platforms with exclusive offers and cashback.</p>
                </div>
                
                <div>
                    <h5 class="font-bold text-lg mb-6 text-white">Quick Links</h5>
                    <ul class="space-y-3 text-gray-400">
                        <li><a href="#home" class="hover:text-white transition-colors">🏠 Home</a></li>
                        <li><a href="#products" class="hover:text-white transition-colors">🛍️ Products</a></li>
                        <li><a href="#platforms" class="hover:text-white transition-colors">🏪 Platforms</a></li>
                        <li><a href="#about" class="hover:text-white transition-colors">ℹ️ About</a></li>
                    </ul>
                </div>
                
                <div>
                    <h5 class="font-bold text-lg mb-6 text-white">Platforms</h5>
                    <ul class="space-y-3 text-gray-400">
                        <li>🛒 Amazon</li>
                        <li>🏭 Alibaba</li>
                        <li>💰 Temu</li>
                        <li>🏪 Shopify</li>
                        <li>🛍️ Daraz</li>
                    </ul>
                </div>
                
                <div>
                    <h5 class="font-bold text-lg mb-6 text-white">Contact</h5>
                    <div class="space-y-3 text-gray-400">
                        <p>📧 info@affiliatehub.com</p>
                        <p>📞 +1 (555) 123-4567</p>
                        <p>🌐 www.affiliatehub.com</p>
                        <div class="flex space-x-4 mt-6">
                            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                                <span class="text-white font-bold">f</span>
                            </div>
                            <div class="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
                                <span class="text-white font-bold">t</span>
                            </div>
                            <div class="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-pink-700 transition-colors">
                                <span class="text-white font-bold">i</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
                <p>&copy; 2024 AffiliateHub. All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
        </div>
    </footer>

    <script>
        // Sample products data with comprehensive information
        let products = [
            {
                id: 1,
                name: "Apple iPhone 15 Pro Max",
                brand: "Apple",
                description: "The most advanced iPhone ever with titanium design, A17 Pro chip, and professional camera system with 5x telephoto zoom.",
                price: 1199.99,
                originalPrice: 1299.99,
                rating: 4.8,
                platform: "amazon",
                category: "electronics",
                image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
                affiliateLink: "https://amazon.com/iphone-15-pro-max-affiliate"
            },
            {
                id: 2,
                name: "Samsung Galaxy Watch 6 Classic",
                brand: "Samsung",
                description: "Premium smartwatch with rotating bezel, advanced health monitoring, and 40+ workout modes for fitness enthusiasts.",
                price: 329.99,
                originalPrice: 429.99,
                rating: 4.6,
                platform: "alibaba",
                category: "electronics",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
                affiliateLink: "https://alibaba.com/galaxy-watch-6-affiliate"
            },
            {
                id: 3,
                name: "Nike Air Max 270 Sneakers",
                brand: "Nike",
                description: "Comfortable lifestyle sneakers with Max Air unit in the heel and breathable mesh upper for all-day comfort.",
                price: 89.99,
                originalPrice: 150.00,
                rating: 4.5,
                platform: "temu",
                category: "fashion",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
                affiliateLink: "https://temu.com/nike-air-max-270-affiliate"
            },
            {
                id: 4,
                name: "Breville Barista Express Coffee Machine",
                brand: "Breville",
                description: "Professional espresso machine with built-in grinder, steam wand, and precise temperature control for café-quality coffee.",
                price: 599.99,
                originalPrice: 799.99,
                rating: 4.7,
                platform: "shopify",
                category: "home",
                image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
                affiliateLink: "https://coffee-store.shopify.com/breville-barista-affiliate"
            },
            {
                id: 5,
                name: "Manduka PRO Yoga Mat",
                brand: "Manduka",
                description: "Professional-grade yoga mat with superior grip, cushioning, and lifetime guarantee. Perfect for all yoga practices.",
                price: 79.99,
                originalPrice: 120.00,
                rating: 4.9,
                platform: "daraz",
                category: "sports",
                image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
                affiliateLink: "https://daraz.com/manduka-yoga-mat-affiliate"
            },
            {
                id: 6,
                name: "The Complete Web Developer Bootcamp",
                brand: "Udemy",
                description: "Comprehensive course covering HTML, CSS, JavaScript, React, Node.js, and more. Perfect for beginners and professionals.",
                price: 49.99,
                originalPrice: 199.99,
                rating: 4.8,
                platform: "amazon",
                category: "books",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
                affiliateLink: "https://amazon.com/web-developer-course-affiliate"
            },
            {
                id: 7,
                name: "Fenty Beauty Gloss Bomb",
                brand: "Fenty Beauty",
                description: "Universal lip luminizer with explosive shine and non-sticky formula. Available in multiple shades for all skin tones.",
                price: 19.99,
                originalPrice: 24.99,
                rating: 4.6,
                platform: "shopify",
                category: "beauty",
                image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
                affiliateLink: "https://fentybeauty.com/gloss-bomb-affiliate"
            },
            {
                id: 8,
                name: "Tesla Model Y Floor Mats",
                brand: "Tesla",
                description: "All-weather floor mats designed specifically for Tesla Model Y. Durable, easy to clean, and perfect fit guaranteed.",
                price: 149.99,
                originalPrice: 199.99,
                rating: 4.4,
                platform: "alibaba",
                category: "automotive",
                image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
                affiliateLink: "https://alibaba.com/tesla-floor-mats-affiliate"
            }
        ];

        let filteredProducts = [...products];
        let nextProductId = 9;

        // Platform colors and info
        const platformInfo = {
            amazon: { color: '#FF9900', name: 'Amazon', emoji: '🛒' },
            alibaba: { color: '#FF6A00', name: 'Alibaba', emoji: '🏭' },
            temu: { color: '#FFD700', name: 'Temu', emoji: '💰' },
            shopify: { color: '#5C6AC4', name: 'Shopify', emoji: '🏪' },
            daraz: { color: '#F85606', name: 'Daraz', emoji: '🛍️' }
        };

        // Category emojis
        const categoryEmojis = {
            electronics: '📱',
            fashion: '👕',
            home: '🏠',
            sports: '⚽',
            books: '📚',
            beauty: '💄',
            automotive: '🚗'
        };

        // Generate 100 diverse images for carousel
        function generateCarouselImages() {
            const carousel = document.getElementById('imageCarousel');
            const imageCategories = [
                'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop'
            ];

            for (let i = 0; i < 100; i++) {
                const img = document.createElement('img');
                img.src = imageCategories[i % imageCategories.length];
                img.alt = `Product ${i + 1}`;
                img.className = 'carousel-item rounded-2xl object-cover shadow-lg';
                img.onerror = function() {
                    this.src = '';
                    this.alt = 'Image failed to load';
                    this.style.display = 'none';
                };
                carousel.appendChild(img);
            }

            // Duplicate images for seamless loop
            for (let i = 0; i < 100; i++) {
                const img = document.createElement('img');
                img.src = imageCategories[i % imageCategories.length];
                img.alt = `Product ${i + 101}`;
                img.className = 'carousel-item rounded-2xl object-cover shadow-lg';
                img.onerror = function() {
                    this.src = '';
                    this.alt = 'Image failed to load';
                    this.style.display = 'none';
                };
                carousel.appendChild(img);
            }
        }

        // Generate star rating
        function generateStars(rating) {
            if (!rating) return '';
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            let stars = '';
            
            for (let i = 0; i < fullStars; i++) {
                stars += '⭐';
            }
            if (hasHalfStar) {
                stars += '⭐';
            }
            
            return `<div class="flex items-center space-x-1">
                <span class="text-yellow-400">${stars}</span>
                <span class="text-sm text-gray-600">(${rating})</span>
            </div>`;
        }

        // Render products
        function renderProducts(productsToRender = filteredProducts) {
            const grid = document.getElementById('productsGrid');
            
            if (productsToRender.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full text-center py-20">
                        <div class="text-6xl mb-6">🔍</div>
                        <div class="text-gray-400 text-2xl mb-6 font-bold">No products found</div>
                        <p class="text-gray-500 mb-8">Try adjusting your filters or add some products</p>
                        <button onclick="openAddProductModal()" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-bold text-lg shadow-lg">
                            ✨ Add Your First Product
                        </button>
                    </div>
                `;
                return;
            }

            grid.innerHTML = '';

            productsToRender.forEach(product => {
                const platformData = platformInfo[product.platform];
                const categoryEmoji = categoryEmojis[product.category] || '📦';
                const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

                const productCard = document.createElement('div');
                productCard.className = 'product-card bg-white rounded-2xl shadow-xl overflow-hidden fade-in border border-gray-100';
                productCard.innerHTML = `
                    <div class="relative">
                        ${product.image ? 
                            `<img src="${product.image}" alt="${product.name}" class="w-full h-56 object-cover" onerror="this.src=''; this.alt='Image failed to load'; this.style.display='none';">` :
                            `<div class="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <div class="text-center">
                                    <div class="text-4xl mb-2">${categoryEmoji}</div>
                                    <span class="text-gray-500 font-medium">No Image</span>
                                </div>
                            </div>`
                        }
                        ${discount > 0 ? `<div class="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">-${discount}%</div>` : ''}
                        <div class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg" style="background: linear-gradient(135deg, ${platformData.color}, ${platformData.color}dd)">
                            ${platformData.emoji} ${platformData.name}
                        </div>
                        ${product.brand ? `<div class="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-lg text-xs font-medium">${product.brand}</div>` : ''}
                    </div>
                    <div class="p-6">
                        <div class="flex items-start justify-between mb-3">
                            <h4 class="font-bold text-lg text-gray-800 leading-tight flex-1 mr-2">${product.name}</h4>
                            <span class="text-2xl">${categoryEmoji}</span>
                        </div>
                        
                        ${product.rating ? generateStars(product.rating) : ''}
                        
                        <p class="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">${product.description}</p>
                        
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center space-x-3">
                                <span class="text-3xl font-bold text-green-600">$${product.price}</span>
                                ${product.originalPrice ? `<span class="text-gray-400 line-through text-lg">$${product.originalPrice}</span>` : ''}
                            </div>
                        </div>
                        
                        <div class="flex space-x-2">
                            <a href="${product.affiliateLink}" target="_blank" rel="noopener noreferrer" class="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 px-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-bold shadow-lg">
                                🛒 Buy Now
                            </a>
                            <button onclick="editProduct(${product.id})" class="bg-blue-100 text-blue-600 px-4 py-3 rounded-xl hover:bg-blue-200 transition-all font-medium">
                                ✏️
                            </button>
                            <button onclick="deleteProduct(${product.id})" class="bg-red-100 text-red-600 px-4 py-3 rounded-xl hover:bg-red-200 transition-all font-medium">
                                🗑️
                            </button>
                        </div>
                    </div>
                `;
                grid.appendChild(productCard);
            });
        }

        // Filter products
        function filterProducts() {
            const platformFilter = document.getElementById('platformFilter').value;
            const categoryFilter = document.getElementById('categoryFilter').value;

            filteredProducts = products.filter(product => {
                const matchesPlatform = !platformFilter || product.platform === platformFilter;
                const matchesCategory = !categoryFilter || product.category === categoryFilter;
                return matchesPlatform && matchesCategory;
            });

            renderProducts(filteredProducts);
        }

        // Modal functions
        function openAddProductModal() {
            document.getElementById('addProductModal').classList.add('active');
        }

        function closeAddProductModal() {
            document.getElementById('addProductModal').classList.remove('active');
            document.getElementById('addProductForm').reset();
        }

        function openEditProductModal() {
            document.getElementById('editProductModal').classList.add('active');
        }

        function closeEditProductModal() {
            document.getElementById('editProductModal').classList.remove('active');
            document.getElementById('editProductForm').reset();
        }

        // Add product
        function addProduct(event) {
            event.preventDefault();
            
            const newProduct = {
                id: nextProductId++,
                name: document.getElementById('productName').value,
                brand: document.getElementById('productBrand').value,
                description: document.getElementById('productDescription').value,
                price: parseFloat(document.getElementById('productPrice').value),
                originalPrice: document.getElementById('productOriginalPrice').value ? parseFloat(document.getElementById('productOriginalPrice').value) : null,
                rating: document.getElementById('productRating').value ? parseFloat(document.getElementById('productRating').value) : null,
                platform: document.getElementById('productPlatform').value,
                category: document.getElementById('productCategory').value,
                image: document.getElementById('productImage').value,
                affiliateLink: document.getElementById('affiliateLink').value
            };

            products.push(newProduct);
            filterProducts();
            closeAddProductModal();
            
            showNotification('🎉 Product added successfully!', 'success');
        }

        // Edit product
        function editProduct(id) {
            const product = products.find(p => p.id === id);
            if (!product) return;

            document.getElementById('editProductId').value = product.id;
            document.getElementById('editProductName').value = product.name;
            document.getElementById('editProductBrand').value = product.brand || '';
            document.getElementById('editProductDescription').value = product.description;
            document.getElementById('editProductPrice').value = product.price;
            document.getElementById('editProductOriginalPrice').value = product.originalPrice || '';
            document.getElementById('editProductRating').value = product.rating || '';
            document.getElementById('editProductPlatform').value = product.platform;
            document.getElementById('editProductCategory').value = product.category;
            document.getElementById('editProductImage').value = product.image || '';
            document.getElementById('editAffiliateLink').value = product.affiliateLink;

            openEditProductModal();
        }

        // Update product
        function updateProduct(event) {
            event.preventDefault();
            
            const id = parseInt(document.getElementById('editProductId').value);
            const productIndex = products.findIndex(p => p.id === id);
            
            if (productIndex === -1) return;

            products[productIndex] = {
                ...products[productIndex],
                name: document.getElementById('editProductName').value,
                brand: document.getElementById('editProductBrand').value,
                description: document.getElementById('editProductDescription').value,
                price: parseFloat(document.getElementById('editProductPrice').value),
                originalPrice: document.getElementById('editProductOriginalPrice').value ? parseFloat(document.getElementById('editProductOriginalPrice').value) : null,
                rating: document.getElementById('editProductRating').value ? parseFloat(document.getElementById('editProductRating').value) : null,
                platform: document.getElementById('editProductPlatform').value,
                category: document.getElementById('editProductCategory').value,
                image: document.getElementById('editProductImage').value,
                affiliateLink: document.getElementById('editAffiliateLink').value
            };

            filterProducts();
            closeEditProductModal();
            
            showNotification('✅ Product updated successfully!', 'success');
        }

        // Delete product
        function deleteProduct(id) {
            const confirmModal = document.createElement('div');
            confirmModal.className = 'modal active';
            confirmModal.innerHTML = `
                <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                    <div class="text-center mb-6">
                        <div class="text-6xl mb-4">🗑️</div>
                        <h3 class="text-2xl font-bold mb-2 text-gray-800">Confirm Delete</h3>
                        <p class="text-gray-600">Are you sure you want to delete this product? This action cannot be undone.</p>
                    </div>
                    <div class="flex justify-center space-x-4">
                        <button onclick="this.closest('.modal').remove()" class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium">
                            Cancel
                        </button>
                        <button onclick="confirmDelete(${id}); this.closest('.modal').remove()" class="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all font-medium shadow-lg">
                            🗑️ Delete
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(confirmModal);
        }

        function confirmDelete(id) {
            products = products.filter(p => p.id !== id);
            filterProducts();
            showNotification('🗑️ Product deleted successfully!', 'success');
        }

        // Show notification
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            const bgColor = type === 'success' ? 'from-green-500 to-green-600' : type === 'error' ? 'from-red-500 to-red-600' : 'from-blue-500 to-blue-600';
            notification.className = `fixed top-6 right-6 px-8 py-4 rounded-2xl text-white z-50 bg-gradient-to-r ${bgColor} shadow-2xl font-medium`;
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        // Close modals when clicking outside
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.classList.remove('active');
            }
        });

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            generateCarouselImages();
            renderProducts();
        });
    </script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'991e4db3805a0048',t:'MTc2MTAyNDAwMy4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
