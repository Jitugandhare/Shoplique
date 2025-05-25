const express = require('express');
const productRoute = express.Router();
const {
    createProduct, getAllProducts, getProductById, updateProduct, deleteProduct
} = require('../controller/productController.js');

productRoute.get('/', getAllProducts)
productRoute.get('/product-details/:id',getProductById)
productRoute.post('/create-product', createProduct);
productRoute.put('/:id', updateProduct);
productRoute.delete('/:id', deleteProduct);


module.exports = productRoute;