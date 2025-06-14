const express = require('express');
const orderRoute = express.Router();
const { userAuth, roleBasedAccess } = require('../middleware/userAuth.js');
const { createOrder, getSingleOrder ,getAllMyOrders,getAllOrders,
    updatingOrderStatus,updateProductStock
} = require('../controller/orderController.js');


// get single order by
orderRoute.get('/admin/order/:id', userAuth, roleBasedAccess("admin"), getSingleOrder);
// create new order either admin or user
orderRoute.post('/new/order', userAuth, createOrder)
// get all orders by user
orderRoute.get("/my-orders",userAuth,getAllMyOrders)
// get all orders by admin
orderRoute.get('/admin/orders',userAuth,roleBasedAccess("admin"),getAllOrders)
// updating order status
orderRoute.put('/admin/order-status/:id', userAuth, roleBasedAccess("admin"), updatingOrderStatus);

// update product stock

orderRoute.put('/admin/product-stock/', userAuth, roleBasedAccess("admin"), updateProductStock);


module.exports = orderRoute;