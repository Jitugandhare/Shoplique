const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ msg: "User is already exists" })
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

        const token = await user.getJwtToken()

        res.status(200).json({
            success: true,
            user,
            token: token
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({ msg: "Email and Password can not be empty" })
        }
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(400).json({ msg: "Invalid Email and Password" })
        }

        const token = await user.getJwtToken();

        res.status(200).json({
            success: true,
            user,
            token: token
        })



    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


const logout = async (req, res) => {


    try {

    } catch (error) {

    }
}








module.exports = {
    register, login, logout
}