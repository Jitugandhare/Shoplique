import React, { useEffect, useState } from 'react'
import "../pageStyles/ProductDetails.css"
import PageTitle from '../components/PageTitle'
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createReview, getProductDetails, removeError } from '../features/product/productSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { addItemsToCart, removeSuccess } from '../features/cart/cartSlice'


const ProductDetails = () => {
    const [userRating, setUserRating] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { loading, error, product, reviewSuccess, reviewLoading } = useSelector((state) => state.product);
    const [selectedImage, setSelectedImage] = useState("");
    const [comment, setComment] = useState("")

    const { loading: cartLoading, error: cartError, cartItems, success, message } = useSelector((state) => state.cart);

    console.log(cartItems)
    const dispatch = useDispatch();
    const { id } = useParams();




    const handleRatingChange = (newRating) => {
        setUserRating(newRating)
    }



    const increaseQuantity = () => {
        if (product.stock <= quantity) {
            toast.error("Cannot exceeds available stocks", { position: "top-center", autoClose: 3000 });
            dispatch(removeError());
            return;
        }
        setQuantity(qty => qty + 1)
    }



    const decreaseQuantity = () => {
        if (quantity <= 1) {
            toast.error("Quantity cannot be less than 1", { position: "top-center", autoClose: 3000 });
            dispatch(removeError());
            return;
        }
        setQuantity(qty => qty - 1)
    }


    const addToCart = () => {
        dispatch(addItemsToCart({ id, quantity }))
    }


    const handleReviewSubmit = (e) => {
        e.preventDefault();

        if (!userRating) {
            toast.error("Please select a rating", { position: "top-center", autoClose: 3000 });
            return;
        }


        dispatch(createReview({
            rating: userRating,
            comment,
            productId: id,
        }));
    };

    useEffect(() => {
        if (reviewSuccess) {
            toast.success("Review submitted successfully", { position: "top-center", autoClose: 3000 });
            setUserRating(0);
            setComment("")
            dispatch(removeSuccess())
            dispatch(getProductDetails(id))
        }
    }, [dispatch, reviewSuccess, id])

    useEffect(() => {
        if (id) {
            dispatch(getProductDetails(id))
        }
    }, [dispatch, id])

    useEffect(() => {
        if (product?.image?.length > 0) {
            setSelectedImage(product.image[0].url);
        }
    }, [product]);

    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: "top-center", autoClose: 3000 })
            dispatch(removeError())
        }
        if (cartError) {
            toast.error(cartError.message, { position: "top-center", autoClose: 3000 })
            dispatch(removeError())
        }
    }, [dispatch, error, cartError]);



    useEffect(() => {
        if (success) {
            toast.success(message, { position: "top-center", autoClose: 3000 })
            dispatch(removeSuccess())
        }

    }, [dispatch, success, message])

    if (loading) {
        return (
            <>
                <NavBar />
                <Loader />
                <Footer />
            </>
        )
    }

    if (error || !product) {
        return (
            <>
                <PageTitle title="Product-Details" />
                <NavBar />
                <Footer />
            </>
        )
    }


    return (
        <>
            <PageTitle title={`${product.name}-Details`} />
            <NavBar />
            <div className="product-details-container">
                <div className="product-detail-container">
                    <div className="product-image-container">
                        <img src={selectedImage} alt={product.name} className='product-detail-image' />
                        {/* image rendered dynamically */}

                        {
                            product.image.length > 1 && (
                                <div className="product-thumbnail">
                                    {product.image.map((img, index) => (
                                        <img src={img.url} key={index} alt="Thumbnail" className='thumbnail-image' onClick={() => setSelectedImage(img.url)} />
                                    ))}
                                </div>
                            )
                        }

                    </div>
                    <div className="product-info">
                        <h2>{product.name}</h2>
                        <p className="product-description">
                            {product.description}
                        </p>
                        <p className="product-price">Price: {product.price}</p>
                        <div className="product-rating">
                            <Rating
                                value={userRating}
                                disabled={false}
                                onRatingChange={handleRatingChange}
                            />

                            <span className="productCardSpan">({product.numOfReviews}  {product.numOfReviews === 1 ? "Review" : "Reviews"})</span>
                        </div>
                        <div className="stock-status">
                            <span className={`${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>

                                {product.stock > 0 ? `In Stock (${product.stock} Available)` : "Out Of Stock"}

                            </span>
                        </div>

                        {
                            product.stock > 0 && (
                                <>
                                    <div className="quantity-control" key={product._id}>
                                        <span className="quantity-label">Quantity</span>
                                        <button className="quantity-button" onClick={decreaseQuantity}>-</button>
                                        <input type="text" className="quantity-value" value={quantity} readOnly />
                                        <button className="quantity-button" onClick={increaseQuantity}>+</button>

                                    </div>
                                    <button className="add-to-cart-btn" onClick={addToCart} disabled={cartLoading}>{cartLoading ? `Adding` : `Add To Cart`}</button>
                                </>
                            )
                        }

                        <form className="review-form" onSubmit={handleReviewSubmit}>
                            <h3>Write a Review</h3>
                            <Rating
                                value={userRating}
                                disabled={false}
                                onRatingChange={handleRatingChange}
                            />

                            <textarea className="review-input" placeholder='Write your review'
                                value={comment} onChange={(e) => setComment(e.target.value)}
                            >

                            </textarea>
                            <button className="submit-review-btn" type='submit' disabled={reviewLoading}>{reviewLoading ? `Submitting...` : `Submit Review`}</button>
                        </form>
                    </div>
                </div>

                <div className="reviews-container">
                    <h3>Customer Reviews</h3>
                    {product.reviews && product.reviews.length > 0 ? (<div className="reviews-section">
                        {
                            product.reviews.map((review, index) => (
                                <div className="review-item" key={index}>
                                    <div className="review-header">
                                        <Rating
                                            value={review.rating}
                                            disabled={true}

                                        />
                                        <p className="review-comment">{review.comment}</p>
                                        <p className="review-name">By: {review.name} </p>

                                    </div>
                                </div>
                            ))
                        }
                    </div>)
                        :
                        (
                            <p className="no-reviews">No reviews available yet, be the first review for this product</p>
                        )

                    }
                </div>

            </div>



            <Footer />
        </>
    )
}

export default ProductDetails