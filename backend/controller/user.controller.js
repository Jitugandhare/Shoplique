const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendToken = require('../utils/jwtToken.js');
const { trusted } = require('mongoose');
const sendEmail = require('../utils/sentEmail.js');
const crypto = require("crypto");
const cloudinary = require('cloudinary').v2;

const register = async (req, res) => {
    const { name, email, password, avatar } = req.body;

    try {

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide name, email, and password" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User is already exists" })
        }


        const myCloud = await cloudinary.uploader.upload(avatar, {
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        });

        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
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
        // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/user/reset/${resetToken}`;
        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/user/reset/${resetToken}`;


        const message = `
        You requested a password reset.
        
        Click the link below to reset your password:${resetPasswordUrl}
        
        
        This link will expire in 10 minutes.
        
        
        If you did not request this, please ignore this email.
        
        
`;




        // console.log(resetPasswordUrl)

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

        // return res.status(200).json({ message: "Password reset link has been sent to your email." });

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
        });


        // console.log("user:", user)

        if (!user) {
            return res.status(404).json({ message: "Reset password token is invalid or has been expired" })
        };

        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(404).json({ message: "Password doesn't match" })
        }
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        sendToken(user, 200, res)

    } catch (error) {
        console.error("Password reset error:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
}

// get user profile

const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.error("User Profile error:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
}


// update password

const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findById(req.user.id).select("+password");

        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (newPassword !== confirmPassword) {
            return res.status(404).json({ message: "Password doesn't match." })
        }

        const checkPasswordIsMatch = await user.verifyPassword(oldPassword);

        if (!checkPasswordIsMatch) {
            return res.status(400).json({ message: "Old password is incorrect." })
        }


        user.password = newPassword;

        await user.save();


        // console.log(checkPasswordIsMatch, `check`)
        sendToken(user, 200, res)

    } catch (error) {
        console.error("Password update error:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
}

// Update user profile
const updateUserDetails = async (req, res) => {
    const { name, email, avatar } = req.body;
    try {




        const updatedUserData = {
            name,
            email,
        }

        if (avatar !== "") {
            const user = await User.findById(req.user.id);
            const imageId = user.avatar.public_id;
            await cloudinary.uploader.destroy(imageId);
            const myCloud = await cloudinary.uploader.upload(avatar, {
                folder: 'avatars',
                width: 150,
                crop: 'scale'
            });
            updatedUserData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        }

        const user = await User.findByIdAndUpdate(req.user.id, updatedUserData, {
            new: true,
            runValidators: true,
        })

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }


        res.status(200).json({
            success: true,
            message: "User Profile Updated Successfully",
            user
        })
    } catch (error) {
        console.log("Profile Update Error:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." })
    }
}


// admin get all users

const getAllUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching users.",
        });
    }
}


// admin get single user
const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User doesn't exists" })
        }
        res.status(200).json({
            success: true,
            user
        })

        // console.log(user)
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching users.",
        });
    }
}

// admin update user's role

const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { role }, {
            new: true,
            runValidators: true
        });
        if (!user) {
            return res.status(400).json({ message: "User doesn't exists." })
        }
        // console.log(user)

        res.status(200).json({
            success: true,
            message: 'User profile updates successfully',
            user
        })

    } catch (error) {

        console.error("Error updating user's role:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating user's role.",
        });

    }
}

// admin delete user's profile

const deleteUsersProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).json({ message: "User doesn't exists." })
        }

        res.status(200).json({
            message: 'User profile deleted successfully'
        })
    } catch (error) {
        console.error("Error deleting user's profile:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting user's profile.",
        });
    }
}



module.exports = {
    register, login, logout, requestPasswordReset,
    resetPassword, getUserDetails,
    updatePassword, updateUserDetails,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUsersProfile
}