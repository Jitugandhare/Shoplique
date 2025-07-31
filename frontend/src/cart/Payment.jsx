import React, { useEffect } from 'react'
import "../cartStyles/Payment.css"
import PageTitle from '../components/PageTitle'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import CheckOutPath from './CheckOutPath'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'



const Payment = () => {

    const orderItem = JSON.parse(sessionStorage.getItem("orderItem")) || {};
    // console.log(`order-item`, orderItem)
    const {user}=useSelector(state=>state.user);
    const {shippingInfo}=useSelector(state=>state.cart)

    if (!orderItem) {
        return (
            <div className="payment-container">
                <p>No order information found. Please go back to the previous step.</p>
                <Link to="/order/confirm" className="payment-go-back">Go Back</Link>
            </div>
        )
    }


    useEffect(() => {

    }, [])


    const completePayment = async (amount) => {
        const { data: keyData } = await axios.get("/api/v1/payment/getKey");
        // console.log(keyData);
        const { key } = keyData;
        // console.log(key)

        const { data: orderData } = await axios.post('/api/v1/payment/process', { amount })
        const { order } = orderData
        console.log(order);

        const options = {
            key,
            amount,
            currency: 'INR',
            name: 'Shoplique',
            description: 'ECommerce Payment Transaction ',
            order_id: order.id,
            callback_url: '/api/v1/payment/paymentVerification', // Your success URL
            prefill: {
                name: user.name,
                email: user.email,
                contact: shippingInfo.phoneNumber,
            },
            theme: {
                color: '#3399cc'
            },
        };

        const rzp = new Razorpay(options);
        rzp.open();
    }

    return (
        <>
            <PageTitle title="Payment Processing" />
            <NavBar />
            <CheckOutPath activePath={3} />
            <div className="payment-container">
                <Link to="/order/confirm" className='payment-go-back' >Go Back</Link>

                <button className="payment-btn"
                    onClick={() => completePayment(orderItem.total)}
                >Pay ₹{orderItem.total} /-</button>

            </div>
            <Footer />
        </>
    )
}

export default Payment