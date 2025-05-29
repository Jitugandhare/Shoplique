const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



const register = async (req, res) => {
    const { name, email, password, avatar, role } = req.body;

    try {

    } catch (error) {

    }
}


const login = async (req, res) => {


    try {

    } catch (error) {

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