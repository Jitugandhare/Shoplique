const express = require('express');
const productRoute = express.Router();
const userAuth = require('../middleware/userAuth.js');
const {
    createProduct, getAllProducts, getProductById, updateProduct, deleteProduct
} = require('../controller/productController.js');

productRoute.get('/', userAuth, getAllProducts)
productRoute.get('/product-details/:id', userAuth, getProductById)
productRoute.post('/create-product', userAuth, createProduct);
productRoute.put('/:id', userAuth, updateProduct);
productRoute.delete('/:id', userAuth, deleteProduct);


module.exports = productRoute;