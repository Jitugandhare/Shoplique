const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendToken = require('../utils/jwtToken.js');
const { trusted } = require('mongoose');
const sendEmail = require('../utils/sentEmail.js');
const crypto = require("crypto")

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User is already exists" })
        }


        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: "This is temp Id",
                url: "This is temp URL"
            }
        })

        sendToken(user, 200, res)


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password can not be empty" })
        }
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(400).json({ message: "Invalid Email and Password" })
        }

        const isPassword = await user.verifyPassword(password)

        if (!isPassword) {
            return res.status(400).json({ message: "Invalid Password" })
        }


        sendToken(user, 200, res)


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


const logout = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Forgot password reset link

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User doesn't exist" });
        }

        // Generate and assign the reset token
        let resetToken;
        resetToken = user.generatePasswordResetToken();

        await user.save({ validateBeforeSave: false });
        const resetPasswordUrl = `http://localhost:8000/reset-password/${resetToken}`;

        const message = `
        You requested a password reset.
        
        Click the link below to reset your password:${resetPasswordUrl}
        
        
        This link will expire in 10 minutes.
        
        
        If you did not request this, please ignore this email.
        
        
`;




        console.log(resetPasswordUrl)

        // sent email functionalities
        try {
            await sendEmail({
                email: user.email,
                subject: "Password Reset Request",
                message
            })

            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} successfully`
            })

        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            await user.save({ validateBeforeSave: false })
            return res.status(500).json({ message: "Email could not be sent.Please try again later" })
        }


        // console.log(resetToken)

        return res.status(200).json({ message: "Password reset link has been sent to your email." });

    } catch (error) {
        console.error("Password reset error:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};


// Reset Password


const resetPassword = async (req, res) => {

    try {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })


        console.log("user:",user)


    } catch (error) {
        console.error("Password reset error:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
}






module.exports = {
    register, login, logout, requestPasswordReset, resetPassword
}