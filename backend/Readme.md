const validator = require('validator');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


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
    this.password = await bcryptjs.hash(this.password, 10);
    if (!this.isModified("password")) {
        return next()
    }
})


// JWT custom method i.e. getJwtToken
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "3d" })
}

// Verify password

userSchema.methods.verifyPassword = async function (userEnteredPassword) {
    return await bcryptjs.compare(userEnteredPassword, this.password)
}

const User = mongoose.model("User", userSchema);


module.exports = User;
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

            return res.status(403).json({ message: `Role ${req.user.role} is not allowed to access the resource` });
        }
        next();
    }
}





module.exports = { userAuth, roleBasedAccess };



 const sendToken = (user, statuscode, res) => {
    const token = user.getJwtToken();


    // cookies options

    const options = {
        expires: new Date(Date.now() + process.env.COOKIES_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }
    res.status(statuscode).cookie("token", token, options).json({
        success: true,
        user,
        token: token
    })
}

module.exports=sendToken;
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
}const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        maxLength: [7, 'Price cannot exceed 7 digits'],
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
    },
    brand: {
        type: String,
        default: '',
    },
    stock: {
        type: Number,
        required: true,
        maxLength: [5, 'Stock quantity should not exceed 5'],
        // min: [0, 'Stock cannot be negative'],
        default: 1,
    },
    image: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    ratings: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
});

const Product=mongoose.model('Product', productSchema);

module.exports = Product;
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cookieParser=require("cookie-parser");
const port = process.env.PORT;
const connection = require('./config/db.js');
const productRoute = require('./routes/productRoute.js')
const userRoute = require('./routes/userRoute.js')

process.on('uncaughtException', (err) => {
    console.log(`Error : ${err.message}`)
    console.log(`Server is shutting down, due to unhandled exception error`);
    process.exit(1);
})



app.use(express.json());
app.use(cookieParser());

app.use('/user', userRoute)
app.use('/product', productRoute)


app.listen(port, async () => {
    try {
        await connection;
        console.log(`server is running on port ${port}`);
    } catch (error) {
        console.log(error);
    }
});
