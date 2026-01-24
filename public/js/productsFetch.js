// Product Fetcher - Fetches products from external server
const ProductsFetcher = {
    // Change this to your actual server URL
    API_URL: 'https://api.example.com/products', // Replace with your server
    
    // Fallback products in case server is down
    fallbackProducts: [
        { id: 1, name: 'MacBook Pro M3 Max', category: 'Laptops', type: 'new', price: 199900, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1200', desc: 'The most powerful MacBook ever built.', specs: ['M3 Max Chip', '36GB Unified Memory', '1TB SSD'] },
        { id: 2, name: 'Custom Gaming Rig V2', category: 'Desktops', type: 'new', price: 148000, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1200', desc: 'Crafted for enthusiasts.', specs: ['RTX 4080 Super', 'Intel i9-14900K', '64GB DDR5'] },
        { id: 3, name: 'iPad Pro M2', category: 'Tablets', type: 'used', price: 63900, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1200', desc: 'Unmatched tablet performance.', specs: ['Apple M2 chip', '12.9-inch Display', 'Face ID'] },
        { id: 4, name: 'Dell XPS 13 OLED', category: 'Laptops', type: 'used', price: 52000, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1200', desc: 'Portable power with OLED.', specs: ['Intel i7', '16GB RAM', '512GB SSD'] },
        { id: 5, name: 'Apple Studio Display', category: 'Displays', type: 'new', price: 127900, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1200', desc: '5K Retina perfection.', specs: ['5K Resolution', '12MP Camera', '6-Speaker System'] },
        { id: 6, name: 'ThinkPad X1 Carbon', category: 'Laptops', type: 'used', price: 71900, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=1200', desc: 'Legendary business reliability.', specs: ['Intel i7 vPro', '32GB RAM', '1TB SSD'] },
        { id: 7, name: 'Mechanical Keyboard Pro', category: 'Accessories', type: 'new', price: 12000, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=1200', desc: 'Tactile excellence.', specs: ['Brown Switches', 'RGB Backlit', 'Wireless/Wired'] },
        { id: 8, name: 'Precision Mouse X', category: 'Accessories', type: 'new', price: 7100, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=1200', desc: 'Surgical precision.', specs: ['25K DPI Sensor', 'Ultra-lightweight', '10 Buttons'] },
        { id: 9, name: 'Mac Studio', category: 'Desktops', type: 'new', price: 159900, image: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&q=80&w=1200', desc: 'Compact powerhouse for creators.', specs: ['M2 Max Chip', '32GB Memory', '512GB SSD'] }
    ],

    /**
     * Fetch products from external server
     * @returns {Promise<Array>} Array of products
     */
    async getProducts() {
        try {
            console.log('Fetching products from:', this.API_URL);
            const response = await fetch(this.API_URL);
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Products fetched successfully:', data);
            return data;
        } catch (error) {
            console.warn('Failed to fetch products from server, using fallback:', error);
            return this.fallbackProducts;
        }
    },

    /**
     * Search products by name or category
     * @param {Array} products - Array of products
     * @param {string} query - Search query
     * @returns {Array} Filtered products
     */
    searchProducts(products, query) {
        return products.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        );
    },

    /**
     * Filter products by price range
     * @param {Array} products - Array of products
     * @param {number} minPrice - Minimum price
     * @param {number} maxPrice - Maximum price
     * @returns {Array} Filtered products
     */
    filterByPrice(products, minPrice, maxPrice) {
        return products.filter(p => p.price >= minPrice && p.price <= maxPrice);
    },

    /**
     * Filter products by category
     * @param {Array} products - Array of products
     * @param {string} category - Category name
     * @returns {Array} Filtered products
     */
    filterByCategory(products, category) {
        return products.filter(p => p.category === category);
    },

    /**
     * Sort products
     * @param {Array} products - Array of products
     * @param {string} sortBy - Sort type: 'price-low', 'price-high', 'newest'
     * @returns {Array} Sorted products
     */
    sortProducts(products, sortBy = 'newest') {
        const sorted = [...products];
        
        if (sortBy === 'price-low') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            sorted.sort((a, b) => b.price - a.price);
        } else {
            sorted.sort((a, b) => b.id - a.id);
        }
        
        return sorted;
    }
};
