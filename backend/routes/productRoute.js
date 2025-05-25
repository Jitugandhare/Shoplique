const express = require('express');
const productRoute = express.Router();
const {
    createProduct, getAllProducts, getProductById, updateProduct, deleteProduct
} = require('../controller/productController.js');

productRoute.get('/',getAllProducts)
productRoute.post('/create-product', createProduct);



module.exports = productRoute;