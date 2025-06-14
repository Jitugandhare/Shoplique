const express = require('express');
const orderRoute = express.Router();
const { userAuth, roleBasedAccess } = require('../middleware/userAuth.js');
const { createOrder, getSingleOrder } = require('../controller/orderController.js');


// get single order
orderRoute.get('/admin/order/:id', userAuth, roleBasedAccess("admin"), getSingleOrder);
// create new order either admin or user
orderRoute.post('/new/order', userAuth, createOrder)

module.exports = orderRoute;