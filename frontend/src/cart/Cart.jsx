import React from 'react'
import NavBar from "../components/NavBar"
import Loader from "../components/Loader"
import Footer from "../components/Footer"
import PageTitle from "../components/PageTitle"
import '../cartStyles/Cart.css'

import CartItem from './CartItem'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subTotal * 0.18;
    // const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const shippingCharges = subTotal > 500 ? 0 : 50;
    const total = subTotal + tax + shippingCharges;

    return (
        <>
            <PageTitle title="Your-Cart" />
            <NavBar />
            {cartItems.length === 0 ? (
                <div className="empty-cart-container">
                    <p className="empty-cart-message">Your cart is empty.</p>
                    <Link to="/products " className="viewProducts">View Products </Link>
                </div>
            ) : (<div className="cart-page">
                <div className="cart-items">
                    <h2 className="cart-items-heading">Your Cart</h2>
                    <div className="cart-table">
                        {/* Cart Table Heading */}
                        <div className="cart-table-header">
                            <div>Product</div>
                            <div>Quantity</div>
                            <div>Item Total</div>
                            <div>Actions</div>
                        </div>
                        {/* Cart Items */}

                        {cartItems && cartItems.map((item) => (<CartItem item={item} key={item.name} />))}


                    </div>


                </div>

                {/* Payment Summary */}
                <div className="price-summary">
                    <h3 className="price-summary-heading">Price Summary</h3>
                    <div className="summary-item">
                        <p className="summary-label">Subtotal:</p>
                        <p className="summary-value">{subTotal}</p>
                    </div>
                    <div className="summary-item">
                        <p className="summary-label">Gst(18%):</p>
                        <p className="summary-value">{tax}/-</p>
                    </div>
                    <div className="summary-item">
                        <p className="summary-label">Shipping Charges:</p>
                        <p className="summary-value">{shippingCharges}/-</p>
                    </div>
                    <div className="summary-total">
                        <p className="total-label">Total:</p>
                        <p className="total-value">{total}/-</p>
                    </div>
                    <button className='checkout-btn'>Proceed to checkout</button>

                </div>

            </div>)}
            <Footer />
        </>
    )
}

export default Cart