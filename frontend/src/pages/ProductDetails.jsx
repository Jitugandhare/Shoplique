import React, { useEffect, useState } from 'react'
import "../pageStyles/ProductDetails.css"
import PageTitle from '../components/PageTitle'
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductDetails, removeError } from '../features/product/productSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'


const ProductDetails = () => {
    const [userRating, setUserRating] = useState(0);
    const { loading, error, product } = useSelector((state) => state.product)
    const dispatch = useDispatch();
    const { id } = useParams();


    const handleRatingChange = (newRating) => {
        setUserRating(newRating)
    }

    useEffect(() => {
        if (id) {
            dispatch(getProductDetails(id))
        }
    }, [dispatch])


    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: "top-center", autoClose: 3000 })
        }
        dispatch(removeError())
    }, [dispatch, error])



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
                      <img src={product.image[0].url.replace('./', '/')} alt={product.name} className='product-detail-image' />


                    </div>
                    <div className="product-info">
                        <h2>{product.name}</h2>
                        <p className="product-description">
                            {product.description}
                        </p>
                        <p className="product-price">Price: {product.price}</p>
                        <div className="product-rating">
                            <Rating
                                value={product.ratings}
                                disabled={true}

                            />
                            <span className="productCardSpan">({product.numOfReviews}  {product.numOfReviews === 1 ? "Review" : "Reviews"})</span>
                        </div>
                        <div className="stock-status">
                            <span className="in-stock">
                                In stock (2 available)
                            </span>
                        </div>

                        <div className="quantity-control">
                            <span className="quantity-label">Quantity</span>
                            <button className="quantity-button">-</button>
                            <input type="text" className="quantity-value" value={1} readOnly />
                            <button className="quantity-button">+</button>

                        </div>
                        <button className="add-to-cart-btn">Add To Cart</button>
                        <form className="review-form">
                            <h3>Write a Review</h3>
                            <Rating Rating
                                value={3}
                                disabled={true}
                                onRatingChange={handleRatingChange}
                            />

                            <textarea className="review-input" placeholder='Write your review'>

                            </textarea>
                            <button className="submit-review-btn">Submit Review</button>
                        </form>
                    </div>
                </div>

                <div className="reviews-container">
                    <h3>Customer Reviews</h3>
                    <div className="reviews-section">
                        <div className="review-item">
                            <div className="review-header">
                                <Rating
                                    value={2}
                                    disabled={true}

                                />
                                <p className="review-comment">Review Comment</p>
                                <p className="review-name">By:jitu</p>

                            </div>
                        </div>
                    </div>
                </div>

            </div>



            <Footer />
        </>
    )
}

export default ProductDetails