import React from 'react'
import NavBar from "../components/NavBar"
import Loader from "../components/Loader"
import Footer from "../components/Footer"
import PageTitle from "../components/PageTitle"
import '../cartStyles/Cart.css'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'


const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart)
    return (
        <>
            <PageTitle title="Your-Cart" />
            <NavBar />
            <div className="cart-page">
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
                        {cartItems &&
                            cartItems.map((item) => (
                                <CartItem item={item} key={item.name} />
                            ))}

                    </div>


                </div>

                {/* Payment Summary */}
                <div className="price-summary">
                    <h3 className="price-summary-heading">Price Summary</h3>
                    <div className="summary-item">
                        <p className="summary-label">Subtotal:</p>
                        <p className="summary-value">200/-</p>
                    </div>
                    <div className="summary-item">
                        <p className="summary-label">Tax(18%):</p>
                        <p className="summary-value">10/-</p>
                    </div>
                    <div className="summary-item">
                        <p className="summary-label">Shipping Charges:</p>
                        <p className="summary-value">50/-</p>
                    </div>
                    <div className="summary-total">
                        <p className="total-label">Total:</p>
                        <p className="total-value">260/-</p>
                    </div>
                    <button className='checkout-btn'>Proceed to checkout</button>

                </div>

            </div>
            <Footer />
        </>
    )
}

export default Cart