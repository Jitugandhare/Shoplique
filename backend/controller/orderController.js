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
            user: req.user.id
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

// get orders by logged-in users
const getAllMyOrders = async (req, res) => {

    try {
        const orders = await Order.find({ user: req.user.id })
        // console.log(orders)
        if (!orders) {
            return res.status(400).json({ message: "Order not found" })
        }

        res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            orders,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong while fetching the orders",
            error: error.message
        });
    }
}

// get all orders by admin

const getAllOrders = async (req, res) => {

    try {
        const orders = await Order.find()
        // console.log(orders)
        if (!orders) {
            return res.status(400).json({ message: "Order not found" })
        }
        let totalAmount = 0;

        orders.forEach(order => {
            totalAmount = totalAmount + order.totalPrice;
        })

        res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            orders,
            totalAmount
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong while fetching the orders",
            error: error.message
        });
    }
}

// updated order status by admin

const updatingOrderStatus = async (req, res) => {

    try {
        const order = await Order.findById(req.params.id)
        // console.log(orders)
        if (!order) {
            return res.status(400).json({ message: "Order not found" })
        }
        if (order.orderStatus === "Delivered") {
            return res.status(400).json({ message: "This Order Already been delivered." })
        }

        await Promise.all(order.orderItems.map(item => updateQuantity(item.product, item.quantity)))
        
        order.orderStatus = req.body.status;
        if (order.orderStatus === "Delivered") {
            order.deliveredAt = Date.now();
        }


        await order.save({ validateBeforeSave: false })


        res.status(200).json({
            success: true,
            message: "Order's status updated successfully",
            order,

        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong while updating orders status",
            error: error.message
        });
    }
}


// update quanity function
const updateQuantity = async (id, quantity) => {
    const product = await Product.findById(id);
    if (!product) {
        return res.status(400).json({ message: "Product not found" })
    }

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false })
}


// Delete order by admin

const deleteOrder = async (req, res) => {

    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(400).json({ message: "Order is not found" })
        }

        if (order.status === "processing") {
            return res.status(400).json({
                message: "Cannot delete the order as it is currently being processed"
            });
        }
        await Order.deleteOne({ _id: req.params.id });

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"

        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong while deleting the order",
            error: error.message
        });
    }
}





module.exports = {
    createOrder,
    getSingleOrder,
    getAllMyOrders,
    getAllOrders,
    updatingOrderStatus,
    deleteOrder

};
