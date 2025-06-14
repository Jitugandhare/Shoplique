const Order = require('../models/orderModel.js');
const Product = require("../models/productModel.js");
const User = require('../models/userModel.js');

const createOrder = async (req, res) => {
    const {
        shippingInfo, orderItems,
        paymentInfo, itemPrice,
        taxPrice,
        shippingPrice, totalPrice
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ success: false, message: "No order items provided" });
    }

    try {
        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            name: req.user._id
        });

        res.status(201).json({
            success: true,
            order,
            message: "Order created successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating the order",
            error: error.message
        });
    }
};



// get single order

const getSingleOrder = async (req, res) => {

    try {
        const order = await Order.findById(req.params.id);
        // console.log(order)
        if (!order) {
            return res.status(400).json({ message: "Order Is Not Found" })
        }

        res.status(200).json({
            success: true,
            message: "Order fetch successfully",
            order,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong while fetching the order",
            error: error.message
        });
    }

}

module.exports = {
    createOrder,
    getSingleOrder
};
