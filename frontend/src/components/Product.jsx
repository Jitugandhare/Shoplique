import React from 'react'
import '../componentsStyles/Product.css';
import { Link } from 'react-router-dom';


const Product = ({ product }) => {

    return (
        <Link to={product._id} className='product_id'>
            <div className="product-card">
                <img src={product.image[0].url} alt={product.name} />\
                <div className="product-details">
                    <h3 className="product-title">
                        {product.name}
                    </h3>
                    <p className="product-price">
                        <strong>Price</strong>:{product.price} /-
                    </p>
                    <button className="add-to-cart">
                        View details
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default Product