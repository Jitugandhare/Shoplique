require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const fileupload = require('express-fileupload');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// DB connection
const connection = require('./config/db.js');

// Routes
const userRoute = require('./routes/userRoute.js');
const productRoute = require('./routes/productRoute.js');
const orderRoute = require('./routes/orderRoute.js');
const paymentRoute = require('./routes/paymentRoute.js');

// App Initialization
const app = express();
const PORT = process.env.PORT || 5000;

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Security & Optimization Middleware
app.use(helmet());
app.use(compression());

// Dev Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileupload({ useTempFiles: true }));

// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/payment', paymentRoute);
// serve static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));



app.all('/*splat', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});

// Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});

// Start Server
const server = app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error('Failed to connect to DB:', err);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});
