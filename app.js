const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const axios = require('axios');
require('dotenv').config();

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

// Proxy route to bypass CORS
app.get('/api/proxy/products', async (req, res) => {
    try {
        const targetUrl = (process.env.API_BASE_URL || 'https://api.mamdanicomputers.com') + '/api/v1/products/public';
        const response = await axios.get(targetUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Proxy error:', error.message);
        res.status(error.response?.status || 500).json({
            success: false,
            message: 'Failed to fetch products through proxy',
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
