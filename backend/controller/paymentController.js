const instance = require('../utils/razorpayInstance.js');

const paymentProcess = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100), // amount in paise (i.e., ₹10)
            currency: "INR"
        };

        const order = await instance.orders.create(options);

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        console.error("Payment processing error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message || "Internal server error"
        });
    }
};


const sendApiKey = async (req, res) => {
    try {
        res.status(200).json({
            key: process.env.RAZORPAY_KEY_ID
        })
    } catch (error) {
        console.error("Payment processing api key error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send api",
            error: error.message || "Internal server error"
        });
    }
}




module.exports = { paymentProcess, sendApiKey };
