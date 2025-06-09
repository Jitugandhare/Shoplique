const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js')



const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        // console.log(token)
        if (!token) {
            return res.status(400).json({ message: 'Access Denied.Please login to continue...' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id)

        // console.log("decoded:", decoded);


        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
    }
};



// role based excess control


const roleBasedAccess = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {

            console.log(`Unauthorized access attempt by role ${req.user.role} on ${req.originalUrl}`);

            return res.status(403).json({ message: `Role ${req.user.role} is not allowed to access this resource` });
        }
        next();
    }
}





module.exports = { userAuth, roleBasedAccess };


