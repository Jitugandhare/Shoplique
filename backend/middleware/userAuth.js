

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies;
        console.log(token)
        // if (!token) {
        //     return res.status(401).json({ message: 'Access Denied. No token provided.' });
        // }



        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = userAuth;


