const express = require('express');
const userRoute = express.Router();
const { register, login, logout, requestPasswordReset,
    resetPassword, getUserDetails,
    updatePassword, updateUserDetails,
    getAllUser
} = require('../controller/user.controller.js');

const { userAuth, roleBasedAccess } = require('../middleware/userAuth.js');

userRoute.post('/register', register);
userRoute.post('/login', login);
userRoute.post('/logout', logout);
userRoute.post('/forgot/password', requestPasswordReset);
userRoute.post('/reset/:token', resetPassword)

userRoute.get('/profile', userAuth, getUserDetails);

userRoute.post('/password/update', userAuth, updatePassword);

userRoute.put('/profile/update', userAuth, updateUserDetails);

// admin route

userRoute.get('/admin/users',userAuth,roleBasedAccess("admin"),getAllUser)



module.exports = userRoute;