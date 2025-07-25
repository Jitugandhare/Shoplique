const validator = require('validator');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require("crypto")



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
    role: {
        type: String,
        enum: ["admin", "user"],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})





// password hashing

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcryptjs.hash(this.password, 10);
})


// JWT custom method i.e. getJwtToken
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "3d" })
}

// Verify password

userSchema.methods.verifyPassword = async function (userEnteredPassword) {
    return await bcryptjs.compare(userEnteredPassword, this.password)
}

// reset Token

userSchema.methods.generatePasswordResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 45 * 60 * 3000 //30 min
    return resetToken;
}






const User = mongoose.model("User", userSchema);


module.exports = User;