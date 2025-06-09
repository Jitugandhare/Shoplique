const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendToken = require('../utils/jwtToken.js');
const { trusted } = require('mongoose');


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









module.exports = {
    register, login, logout
}