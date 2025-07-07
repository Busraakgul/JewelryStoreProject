const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Gold price cache
let goldPriceCache = {
  price: 65.50, // fallback price
  lastUpdated: 0
};

// Function to fetch gold price
async function fetchGoldPrice() {
  try {
    const now = Date.now();
    // Cache for 1 hour
    if (now - goldPriceCache.lastUpdated < 3600000) {
      return goldPriceCache.price;
    }

    // Using metals-api.com as a free gold price API
    const response = await axios.get('https://api.metals.live/v1/spot/gold', {
      timeout: 5000
    });
    
    if (response.data && response.data.price) {
      goldPriceCache.price = response.data.price / 31.1035; // Convert from per ounce to per gram
      goldPriceCache.lastUpdated = now;
    }
  } catch (error) {
    console.log('Failed to fetch gold price, using cached value:', error.message);
  }
  
  return goldPriceCache.price;
}

// Load products data
function loadProducts() {
  try {
    const productsPath = path.join(__dirname, 'data', 'products.json');
    const productsData = fs.readFileSync(productsPath, 'utf8');
    return JSON.parse(productsData);
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

// Calculate price for a product
function calculatePrice(product, goldPrice) {
  return Math.round((product.popularityScore + 1) * product.weight * goldPrice * 100) / 100;
}

// Convert popularity score to 5-star rating
function convertPopularityToStars(popularityScore) {
  return Math.round(popularityScore * 5 * 10) / 10;
}

// API Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = loadProducts();
    const goldPrice = await fetchGoldPrice();
    
    // Apply filters if provided
    const { minPrice, maxPrice, minPopularity, maxPopularity } = req.query;
    
    let filteredProducts = products.map(product => {
      const price = calculatePrice(product, goldPrice);
      const starRating = convertPopularityToStars(product.popularityScore);
      
      return {
        ...product,
        price: price,
        starRating: starRating,
        goldPrice: goldPrice
      };
    });
    
    // Apply filters
    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }
    if (minPopularity) {
      filteredProducts = filteredProducts.filter(p => p.popularityScore >= parseFloat(minPopularity));
    }
    if (maxPopularity) {
      filteredProducts = filteredProducts.filter(p => p.popularityScore <= parseFloat(maxPopularity));
    }
    
    res.json({
      success: true,
      data: filteredProducts,
      goldPrice: goldPrice
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const products = loadProducts();
    const productIndex = parseInt(req.params.id);
    
    if (productIndex < 0 || productIndex >= products.length) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    const product = products[productIndex];
    const goldPrice = await fetchGoldPrice();
    const price = calculatePrice(product, goldPrice);
    const starRating = convertPopularityToStars(product.popularityScore);
    
    res.json({
      success: true,
      data: {
        ...product,
        price: price,
        starRating: starRating,
        goldPrice: goldPrice
      }
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend: http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/products`);
});