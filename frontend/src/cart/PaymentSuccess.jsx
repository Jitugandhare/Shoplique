import React from 'react'
import '../cartStyles/PaymentSuccess.css'
import PageTitle from '../components/PageTitle'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PaymentSuccess = () => {
    const { loading } = useSelector(state => state.cart)
    const [searchParams] = useSearchParams();
    const reference = searchParams.get("reference")

    console.log(reference)



    return (
        <>
            {
                loading ? (<Loader />) : (
                    <>
                        <div className="payment-success-container">
                            <div className="success-icon">
                                <div className="checkmark">

                                </div>

                            </div>
                            <h1>Order Confirmation</h1>
                            <p>Your payment wa successful . Reference ID :{" "}  <strong>{reference}</strong> </p>
                            <Link to="/products" className='explore-btn'>Explore More Products</Link>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default PaymentSuccess