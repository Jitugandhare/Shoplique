const express = require('express');
const userRoute = express.Router();
const { register, login, logout } = require('../controller/user.controller.js');



userRoute.post('/register', register);
userRoute.post('/login', login);
userRoute.post('/logout', logout)





module.exports = userRoute;