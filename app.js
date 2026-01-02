const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
