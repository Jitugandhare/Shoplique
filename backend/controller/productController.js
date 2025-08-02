const Product = require('../models/productModel.js');
const cloudinary = require('cloudinary').v2;


const createProduct = async (req, res) => {
    try {

        let image = [];

        if (typeof req.body.image === 'string') {
            image.push(req.body.image)
        } else {
            image = req.body.image
        }

        const imageLinks = [];
        for (let i = 0; i < image.length; i++) {
            const result = await cloudinary.uploader.upload(image[i], {
                folder: "products"
            })
            imageLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        req.body.image = imageLinks;
        req.body.user = req.user.id;

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
            limit = 10,
            keyword
        } = req.query;

        // Build MongoDB query object
        const queryObject = {};

        if (keyword) {
            queryObject.$or = [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { category: { $regex: keyword, $options: 'i' } },

            ];
        } else {
            if (name) {
                queryObject.name = { $regex: name, $options: 'i' };
            }

            if (description) {
                queryObject.description = { $regex: description, $options: 'i' };
            }

            if (category) {
                queryObject.category = category;
            }
        }

        if (minPrice || maxPrice) {
            queryObject.price = {};
            if (minPrice) queryObject.price.$gte = Number(minPrice);
            if (maxPrice) queryObject.price.$lte = Number(maxPrice);
        }

        // Convert page & limit to numbers
        const pageNum = Math.max(1, Number(page));
        const limitNum = Math.max(1, Number(limit));
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

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found.",
            });
        }

        // Return paginated result
        return res.status(200).json({
            success: true,
            count: products.length,
            page: pageNum,
            totalPages,
            productCount: total,
            limit: limitNum,
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
        let product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        // handle image

        let images = [];
        if (typeof req.body.images === 'string') {
            images.push(req.body.images)
        } else if (Array.isArray(req.body.images)) {
            images = req.body.images
        }

        if (images.length > 0) {
            for (let i = 0; i < product.image.length; i++) {
                await cloudinary.uploader.destroy(product.image[i].public_id)
            }

            const imageLinks = [];
            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.uploader.upload(images[i], {
                    folder: "products"
                })
                imageLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url
                })
            }
            req.body.image = imageLinks;
        }


        const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            product: updateProduct,
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
        let product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        // delete image
        for (let i = 0; i < product.image.length; i++) {
            await cloudinary.uploader.destroy(product.image[0].public_id)
        }

        product = await Product.findByIdAndDelete(id);


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


// product review

const createReviewForProduct = async (req, res) => {
    try {
        const { rating, comment, productId } = req.body;
        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment,
            productId
        }

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(400).json({ message: "Product Not Found" })
        }

        const reviewExist = product.reviews.find(review => review.user.toString() === req.user.id.toString());

        if (reviewExist) {
            product.reviews.forEach(review => {
                if (review.user.toString() === req.user.id.toString()) {
                    review.rating = rating;
                    review.comment = comment;
                }
            })
        } else {
            product.reviews.push(review)
        }

        product.numOfReviews = product.reviews.length;

        let sum = 0;

        product.reviews.forEach(review => {
            sum += review.rating;
        });

        product.ratings = product.reviews.length ? sum / product.reviews.length : 0;

        await product.save({ validateBeforeSave: false });




        res.status(200).json({
            success: true,
            product
        })





    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// get product review
const getProductReview = async (req, res) => {
    try {
        const product = await Product.findById(req.query.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            reviews: product.reviews
        });

    } catch (error) {
        console.error("Error fetching product reviews:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// delete product review

const deleteProductReview = async (req, res) => {
    try {

        const product = await Product.findById(req.query.productId);
        // console.log(product)
        if (!product) {
            return res.status(400).json({ message: "Product Not Found" })
        }

        const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());
        product.reviews = reviews;

        const numOfReviews = reviews.length;

        let sum = 0;
        reviews.forEach(review => {
            sum += review.rating;
        });

        const ratings = reviews.length > 0 ? sum / reviews.length : 0;

        await Product.findByIdAndUpdate(req.query.productId, {
            reviews,
            numOfReviews,
            ratings
        }, {
            new: true,
            runValidators: true
        });

        // await product.save();

        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        })
    } catch (error) {
        console.error('Error while deleting product review', error);
        res.status(500).json({ message: 'Error while deleting product review' });
    }
}











// Admin get all products

const getAdminAllProducts = async (req, res) => {

    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching products.",
        });
    }
}




module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getAdminAllProducts,
    createReviewForProduct, deleteProductReview, getProductReview
};
