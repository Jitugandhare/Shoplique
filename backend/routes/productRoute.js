const express = require('express');
const productRoute = express.Router();
const { userAuth, roleBasedAccess } = require('../middleware/userAuth.js');

const {
    createProduct, getAllProducts, getProductById, updateProduct, deleteProduct
} = require('../controller/productController.js');





productRoute.get('/', getAllProducts);
productRoute.post('/admin/create-product', userAuth, roleBasedAccess("admin"), createProduct);

productRoute.get('/product-details/:id', getProductById)

productRoute.put('/admin/product/:id', userAuth, roleBasedAccess("admin"), updateProduct);
productRoute.delete('/admin/product/:id', userAuth, roleBasedAccess("admin"), deleteProduct);


module.exports = productRoute;