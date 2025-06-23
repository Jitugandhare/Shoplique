import React, { useState } from 'react'
import "../pageStyles/ProductDetails.css"
import PageTitle from '../components/PageTitle'
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Rating from '../components/Rating'


const ProductDetails = () => {
    const [userRating, setUserRating] = useState(0);

    const handleRatingChange = (newRating) => {
        setUserRating(newRating)
    }

    return (
        <>
            <PageTitle title="Product-Details" />
            <NavBar />
            <div className="product-details-container">
                <div className="product-detail-container">
                    <div className="product-image-container">
                        <img src="" alt="Product Name" />
                    </div>
                    <div className="product-info">
                        <h2>Product Name</h2>
                        <p className="product-description">
                            Product Description
                        </p>
                        <p className="product-price">Price:200</p>
                        <div className="product-rating">
                            <Rating
                                value={3}
                                disabled={true}

                            />
                            <span className="productCardSpan">(1 Review)</span>
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