const express = require('express');
const paymentRoute = express.Router()
const { userAuth } = require('../middleware/userAuth.js');
const paymentProcess = require('../controller/paymentController.js');

paymentRoute.post('/process', userAuth, paymentProcess)



module.exports = paymentRoute;