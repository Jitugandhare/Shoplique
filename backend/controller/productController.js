const Product = require('../models/productModel.js');

const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json({
            success: true,
            savedProduct,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            minPrice,
            maxPrice,
            sortBy,
            page = 1,
            limit = 10
        } = req.query;

        // Build MongoDB query object
        const queryObject = {};

        if (name) {
            queryObject.name = { $regex: name, $options: 'i' };
        }

        if (description) {
            queryObject.description = { $regex: description, $options: 'i' };
        }

        if (category) {
            queryObject.category = category;
        }

        if (minPrice || maxPrice) {
            queryObject.price = {};
            if (minPrice) queryObject.price.$gte = Number(minPrice);
            if (maxPrice) queryObject.price.$lte = Number(maxPrice);
        }

        // Convert page & limit to numbers
        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.max(1, parseInt(limit));
        const skip = (pageNum - 1) * limitNum;
        // console.log(pageNum)
        // console.log(typeof pageNum)
        // Dynamic sorting
        let sortOption = {};
        if (sortBy) {
            const [field, order] = sortBy.split(':');
            sortOption[field] = order === 'desc' ? -1 : 1;
        }

        // Execute main query
        const products = await Product.find(queryObject)
            .sort(sortOption)
            .skip(skip)
            .limit(limitNum);

        // Get total count for pagination metadata
        const total = await Product.countDocuments(queryObject);
        const totalPages = Math.ceil(total / limitNum);

        

        // Return paginated result
        return res.status(200).json({
            success: true,
            count: products.length,
            page: pageNum,
            totalPages,
            totalProducts: total,
            products,
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching products.",
        });
    }
};




const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(200).json({
            success: true,
            updatedProduct,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
