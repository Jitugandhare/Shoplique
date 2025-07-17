import React from 'react'
import "../cartStyles/Payment.css"
import PageTitle from '../components/PageTitle'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import CheckOutPath from './CheckOutPath'
import { Link } from 'react-router-dom'


const Payment = () => {
    const orderItem = JSON.parse(sessionStorage.getItem("orderItem")) || {};
    console.log(`order-item`, orderItem)

    if (!orderItem) {
        return (
            <div className="payment-container">
                <p>No order information found. Please go back to the previous step.</p>
                <Link to="/order/confirm" className="payment-go-back">Go Back</Link>
            </div>
        )
    }

    return (
        <>
            <PageTitle title="Payment Processing" />
            <NavBar />
            <CheckOutPath activePath={3} />
            <div className="payment-container">
                <Link to="/order/confirm" className='payment-go-back' >Go Back</Link>

                <button className="payment-btn">Pay ₹{orderItem.total} </button>

            </div>
            <Footer />
        </>
    )
}

export default Payment