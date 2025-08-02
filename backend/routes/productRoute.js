const express = require('express');
const productRoute = express.Router();
const { userAuth, roleBasedAccess } = require('../middleware/userAuth.js');

const {
    createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getAdminAllProducts
    , createReviewForProduct, deleteProductReview, getProductReview

} = require('../controller/productController.js');





productRoute.get('/', getAllProducts);
productRoute.get('/admin/product', userAuth, roleBasedAccess("admin"), getAdminAllProducts)
productRoute.post('/admin/create-product', userAuth, roleBasedAccess("admin"), createProduct);

productRoute.get('/product-details/:id', getProductById)

productRoute.put('/admin/product/:id', userAuth, roleBasedAccess("admin"), updateProduct);
productRoute.delete('/admin/product/:id', userAuth, roleBasedAccess("admin"), deleteProduct);

``
productRoute.get('/admin/review', userAuth, getProductReview);
productRoute.put('/review', userAuth, createReviewForProduct)
productRoute.delete('/review-delete', userAuth, deleteProductReview)



module.exports = productRoute;