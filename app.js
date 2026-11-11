const express = require('express');
const path = require('path');
const fs = require('fs');
const dns = require('dns');
// Prefer IPv4 first to prevent IPv6 routing timeouts on local networks
dns.setDefaultResultOrder('ipv4first');
const expressLayouts = require('express-ejs-layouts');
const axios = require('axios');
require('dotenv').config();

console.log('--- Environment Check ---');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('API_BASE_URL:', process.env.API_BASE_URL || 'Not Set (using default)');
console.log('-------------------------');

const app = express();
const port = 3000;

// Set global locals for all templates
app.locals.API_BASE_URL = process.env.API_BASE_URL || 'https://api.mamdanicomputers.com';

// EJS and Layouts setup
app.use(expressLayouts);
app.set('layout', 'layout'); // This now points to views/layout.ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Our Services' });
});

app.get('/products', (req, res) => {
    res.render('products', { title: 'Products' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

app.get('/repair', (req, res) => {
    res.render('repair', { title: 'Repair Services' });
});

app.get('/product/:id', (req, res) => {
    res.render('product-detail', { 
        title: 'Product Details',
        productId: req.params.id
    });
});

const CACHE_FILE = path.join(__dirname, 'data', 'products-cache.json');
let productsCache = { data: null, timestamp: 0 };
const CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes

// Load local snapshot immediately on boot so catalog is always available
try {
    if (fs.existsSync(CACHE_FILE)) {
        const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && parsed.success && Array.isArray(parsed.data)) {
            productsCache = { data: parsed, timestamp: 0 };
            console.log(`[Proxy] Loaded ${parsed.data.length} products from local snapshot.`);
        }
    }
} catch (err) {
    console.warn('[Proxy] Could not load local snapshot:', err.message);
}

async function fetchUpstreamProducts() {
    const targetUrl = (process.env.API_BASE_URL || 'https://api.mamdanicomputers.com') + '/api/v1/products/public';
    try {
        console.log(`[Proxy] Fetching from: ${targetUrl}`);
        const response = await axios.get(targetUrl, { timeout: 4000 });
        if (response.data && response.data.success) {
            productsCache = { data: response.data, timestamp: Date.now() };
            try {
                fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
                fs.writeFileSync(CACHE_FILE, JSON.stringify(response.data, null, 2));
            } catch (_) {}
            return response.data;
        }
    } catch (error) {
        console.warn(`[Proxy] Upstream fetch error: ${error.message}`);
    }
    return productsCache.data;
}

// Pre-warm / revalidate the cache on server startup
fetchUpstreamProducts();

// Proxy route to bypass CORS with stale-while-revalidate
app.get('/api/proxy/products', async (req, res) => {
    res.set('Cache-Control', 'public, max-age=60');
    const now = Date.now();

    // Cache is fresh: return immediately (< 1ms)
    if (productsCache.data && (now - productsCache.timestamp < CACHE_TTL_MS)) {
        return res.json(productsCache.data);
    }

    // Cache exists (either snapshot or previous fetch): return immediately, revalidate in background
    if (productsCache.data) {
        res.json(productsCache.data);
        fetchUpstreamProducts();
        return;
    }

    // If completely empty (first run without snapshot), wait for fetch
    const data = await fetchUpstreamProducts();
    if (data) {
        return res.json(data);
    }

    res.status(504).json({
        success: false,
        message: 'Upstream product API timeout'
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
