const express = require('express');
const userRoute = express.Router();
const { register, login, logout, requestPasswordReset } = require('../controller/user.controller.js');



userRoute.post('/register', register);
userRoute.post('/login', login);
userRoute.post('/logout', logout);
userRoute.post('/forgot/password', requestPasswordReset);





module.exports = userRoute;