const express = require('express');
const paymentRoute = express.Router()
const { userAuth } = require('../middleware/userAuth.js');
const { paymentProcess, sendApiKey } = require('../controller/paymentController.js');

paymentRoute.post('/process', userAuth, paymentProcess)

paymentRoute.get('/getKey', userAuth, sendApiKey)

module.exports = paymentRoute;