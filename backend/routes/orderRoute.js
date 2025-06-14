const express = require('express');
const orderRoute = express.Router();
const { userAuth, roleBasedAccess } = require('../middleware/userAuth.js');
const { createOrder } = require('../controller/orderController.js');


orderRoute.post('/new/order', userAuth, createOrder)

module.exports = orderRoute;