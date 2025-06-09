const mongoose = require('mongoose');

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
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
