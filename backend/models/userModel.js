const validator = require('validator');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [20, 'Invalid name. Please Enter your name fewer than 20 character '],
        minLength: [3, 'Name should contains more than 3 character.']
    },
    email: {
        type: String,
        required: [true, "Enter your email"],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, "Enter valid email"]
    },
    password: {
        type: String,
        required: [true, 'Enter password'],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

const User=mongoose.model("User",userSchema);


module.exports=User;