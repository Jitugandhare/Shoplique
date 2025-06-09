const express = require('express');
const productRoute = express.Router();
const { userAuth, roleBasedAccess } = require('../middleware/userAuth.js');

const {
    createProduct, getAllProducts, getProductById, updateProduct, deleteProduct
} = require('../controller/productController.js');





productRoute.get('/', userAuth, getAllProducts)
productRoute.get('/product-details/:id', userAuth, roleBasedAccess("admin"), getProductById)
productRoute.post('/create-product', userAuth, roleBasedAccess("admin"), createProduct);
productRoute.put('/:id', userAuth, roleBasedAccess("admin"), updateProduct);
productRoute.delete('/:id', userAuth, roleBasedAccess("admin"), deleteProduct);


module.exports = productRoute;