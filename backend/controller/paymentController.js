const instance = require('../utils/razorpayInstance.js');
const crypto = require('crypto')

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

// Payment Verification

const paymentVerification = async (req, res) => {

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    try {
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac('sha256',
            process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex')

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            res.status(200).json({
                success: true,
                message: "Payment Verified Successfully.",
                reference: razorpay_payment_id,
            })
        } else {
            res.status(401).json({
                success: false,
                message: "Payment verification failed.",
            });
        }

    } catch (error) {
        console.error("Payment processing API error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to verify payment",
            error: error.message || "Internal server error"
        });
    }
}





module.exports = { paymentProcess, sendApiKey, paymentVerification };
