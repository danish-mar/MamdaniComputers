/**
 * HOW TO SET UP EXTERNAL PRODUCT SERVER
 * 
 * The products now fetch from an external server instead of hardcoding them.
 * 
 * STEP 1: Update the API URL
 * ================================
 * Open: public/js/productsFetch.js
 * Find: API_URL: 'https://api.example.com/products'
 * Replace with your actual server URL
 * 
 * Example:
 *   API_URL: 'https://your-products-api.com/api/products'
 * 
 * 
 * STEP 2: Server Response Format
 * ================================
 * Your server must return a JSON array with this structure:
 * 
 * [
 *   {
 *     id: 1,
 *     name: "Product Name",
 *     category: "Laptops",  // Must match one of your categories
 *     type: "new",  // or "used"
 *     price: 199900,
 *     image: "https://image-url.com/product.jpg",
 *     desc: "Product description",
 *     specs: ["Spec 1", "Spec 2", "Spec 3"]
 *   }
 * ]
 * 
 * 
 * STEP 3: Test Your Setup
 * ================================
 * 1. Open your browser console (F12 or Ctrl+Shift+I)
 * 2. Navigate to the Products page
 * 3. Watch the console for logs:
 *    - "Fetching products from: [YOUR_URL]"
 *    - "Products fetched successfully: [ARRAY]"
 *    - Or error message if connection fails
 * 
 * 4. If it fails, the fallback products will display automatically
 * 
 * 
 * STEP 4: CORS Setup (if needed)
 * ================================
 * If you get CORS errors, your server needs to allow requests from:
 * - localhost:3000 (development)
 * - your-domain.com (production)
 * 
 * Add CORS headers to your server:
 * Access-Control-Allow-Origin: *
 * (or specify your domain instead of *)
 * 
 * 
 * AVAILABLE HELPER FUNCTIONS
 * ================================
 * Use these in your products page or other scripts:
 * 
 * await ProductsFetcher.getProducts()
 *   - Fetches products from server, returns fallback on error
 * 
 * ProductsFetcher.searchProducts(products, query)
 *   - Search by name or category
 * 
 * ProductsFetcher.filterByPrice(products, minPrice, maxPrice)
 *   - Filter by price range
 * 
 * ProductsFetcher.filterByCategory(products, category)
 *   - Filter by single category
 * 
 * ProductsFetcher.sortProducts(products, sortBy)
 *   - sortBy: 'price-low', 'price-high', 'newest'
 * 
 * 
 * EXAMPLE SERVER SETUP (Node.js/Express)
 * ================================
 * 
 * const express = require('express');
 * const app = express();
 * 
 * // Enable CORS
 * app.use((req, res, next) => {
 *   res.header('Access-Control-Allow-Origin', '*');
 *   next();
 * });
 * 
 * app.get('/api/products', (req, res) => {
 *   const products = [
 *     { 
 *       id: 1, 
 *       name: 'MacBook Pro', 
 *       category: 'Laptops',
 *       type: 'new',
 *       price: 199900,
 *       image: 'https://...',
 *       desc: 'Description',
 *       specs: ['M3 Max', '36GB RAM', '1TB SSD']
 *     }
 *   ];
 *   res.json(products);
 * });
 * 
 * app.listen(3001);
 */
