const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js')



const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        console.log(token)
        if (!token) {
            return res.status(400).json({ message: 'Access Denied.Please login to continue...' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id)

        console.log("decoded:", decoded);


        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = userAuth;


