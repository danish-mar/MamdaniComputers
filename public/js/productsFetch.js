// Product Fetcher - Fetches products from external server
const ProductsFetcher = {
    // Use the local proxy to bypass CORS
    API_URL: '/api/proxy/products',
    
    // Fallback products in case server is down
    fallbackProducts: [
        { id: '1', name: 'MacBook Pro M3 Max', category: 'Laptops', type: 'new', price: 199900, images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1200'], specifications: { CPU: 'M3 Max Chip', RAM: '36GB Unified Memory', Storage: '1TB SSD' } },
        { id: '2', name: 'Custom Gaming Rig V2', category: 'Desktops', type: 'new', price: 148000, images: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1200'], specifications: { GPU: 'RTX 4080 Super', CPU: 'Intel i9-14900K', RAM: '64GB DDR5' } }
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
            
            const result = await response.json();
            if (result.success && Array.isArray(result.data)) {
                console.log('Products fetched successfully:', result.data);
                // Ensure each product has an 'id' field for consistency if it only has '_id'
                return result.data.map(p => ({
                    ...p,
                    id: p.id || p._id
                }));
            } else {
                throw new Error(result.message || 'Unknown API error');
            }
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
