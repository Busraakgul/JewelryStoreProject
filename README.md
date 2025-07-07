# Jewelry Product Listing Application

Modern, responsive jewelry product listing application with dynamic pricing based on real-time gold prices.

Web Live Link: **https://jewelrystoreproject.onrender.com/**

## Features

- **Real-time Gold Price Integration**: Dynamic pricing based on live gold market data
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Carousel**: Swipe/scroll through products with smooth animations
- **Color Variations**: Switch between Yellow Gold, White Gold, and Rose Gold options
- **Star Rating System**: Popularity scores converted to 5-star ratings
- **Advanced Filtering**: Filter by price range and popularity score
- **Touch Support**: Mobile-friendly swipe gestures
- **Modern UI**: Clean, professional design with smooth transitions

## Technologies Used

### Backend
- Node.js with Express.js
- RESTful API architecture
- Real-time gold price API integration
- CORS enabled for cross-origin requests

### Frontend
- Vanilla JavaScript (ES6+)
- CSS3 with modern features
- Responsive design with CSS Grid/Flexbox
- Touch events for mobile support
- Google Fonts (Montserrat)

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### 1. Clone/Download the Project
```bash
# Create project directory
mkdir jewelry-app
cd jewelry-app
```

### 2. Setup Backend
```bash
# Create backend directory
mkdir backend
cd backend

# Create package.json (copy from artifact)
# Create server.js (copy from artifact)

# Create data directory and products.json
mkdir data
# Copy products.json to data folder

# Install dependencies
npm install

# Start backend server
npm start
```

Backend will run on `http://localhost:3000`

### 3. Setup Frontend
```bash
# Go back to main directory
cd ..

# Create frontend directory
mkdir frontend
cd frontend

# Create HTML, CSS, JS files (copy from artifacts)
# Copy index.html, style.css, script.js

# Optional: Install live-server for development
npm install -g live-server

# Start frontend (if using live-server)
live-server --port=8080
```

### 4. Alternative: Run from Backend
The backend serves static files, so you can access the frontend directly at:
`http://localhost:3000`

## API Endpoints

### Get All Products
- **URL**: `/api/products`
- **Method**: GET
- **Query Parameters**:
  - `minPrice`: Minimum price filter
  - `maxPrice`: Maximum price filter
  - `minPopularity`: Minimum popularity score (0-1)
  - `maxPopularity`: Maximum popularity score (0-1)

### Get Single Product
- **URL**: `/api/products/:id`
- **Method**: GET
- **Parameters**: `id` (product index)

### Health Check
- **URL**: `/api/health`
- **Method**: GET

## Project Structure
```
jewelry-app/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── data/
│       └── products.json
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── package.json (optional)
└── README.md
```

## Key Features Implementation

### Dynamic Pricing
- Formula: `Price = (popularityScore + 1) * weight * goldPrice`
- Real-time gold price fetched from external API
- Cached for 1 hour to optimize performance

### Responsive Carousel
- Desktop: 4 cards per view
- Tablet: 3 cards per view  
- Mobile: 1-2 cards per view
- Touch swipe support for mobile
- Smooth CSS transitions

### Color Variations
- Three color options: Yellow Gold, White Gold, Rose Gold
- Dynamic image switching
- Color name display updates
- Visual feedback for selected color

### Star Rating System
- Popularity score (0-1) converted to 5-star rating
- Displays both stars and numeric rating
- Accurate decimal representation

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations
- Gold price caching (1 hour)
- Optimized image loading
- Efficient DOM manipulation
- CSS transforms for smooth animations
- Debounced touch events

## Future Enhancements
- Add to cart functionality
- User authentication
- Product details modal
- Search functionality
- Wishlist feature
- Product comparison
- Real-time inventory updates

## Deployment Options

### Local Development
Follow installation steps above

### Production Deployment
1. **Heroku**: Deploy backend to Heroku
2. **Vercel**: Deploy frontend to Vercel
3. **Netlify**: Deploy frontend to Netlify
4. **AWS**: Deploy to EC2 or Elastic Beanstalk

## Troubleshooting

### Common Issues
1. **Gold Price API Error**: App falls back to cached/default price
2. **CORS Issues**: Backend includes CORS middleware
3. **Mobile Touch Issues**: Ensure touch events are properly configured
4. **Image Loading**: Check network connectivity and image URLs

### Development Tips
- Use browser developer tools for debugging
- Check console for API errors
- Test responsive design on multiple devices
- Verify touch gestures on mobile devices

## Support
For issues or questions, please check the console logs and API responses for debugging information.
