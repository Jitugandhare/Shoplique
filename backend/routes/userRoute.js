const express = require('express');
const userRoute = express.Router();
const {register,login,logout}=require('../controller/user.controller.js');



userRoute.post('/register',register)





module.exports=userRoute;