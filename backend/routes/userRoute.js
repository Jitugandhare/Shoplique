const express = require('express');
const userRoute = express.Router();
const { register, login, logout, requestPasswordReset ,resetPassword,getUserDetails} = require('../controller/user.controller.js');
const { userAuth } = require('../middleware/userAuth.js');

userRoute.post('/register', register);
userRoute.post('/login', login);
userRoute.post('/logout', logout);
userRoute.post('/forgot/password', requestPasswordReset);
userRoute.post('/reset/:token',resetPassword)

userRoute.get('/profile',userAuth,getUserDetails);





module.exports = userRoute;