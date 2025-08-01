import React, { useState } from 'react'
import '../componentsStyles/Product.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import Rating from './Rating';


const Product = ({ product }) => {
    const [rating, setRating] = useState(0);



    const handleRatingChange = (newRating) => {
        setRating(newRating)
        console.log(`Rating changed to ${newRating}`)
    }

    return (
        <Link to={`/product-details/${product._id}`} className='product_id'>
            <div className="product-card">
                <img src={product.image[0].url} alt={product.name} className='product-image-card' />\
                <div className="product-details">
                    <h3 className="product-title">
                        {product.name}
                    </h3>
                    <p className="home-price">
                        <strong>Price</strong>:{product.price} /-
                    </p>
                    <div className="rating-container">
                        <Rating
                            value={product.ratings}
                            onRatingChange={handleRatingChange}
                            disabled={true}
                        />
                    </div>
                    <span className="productCardSpan">
                        ( {product.numOfReviews} {product.numOfReviews === 1 ? "Review" : "Reviews"} )
                    </span>
                    <button className="add-to-cart">
                        View details
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default Product;