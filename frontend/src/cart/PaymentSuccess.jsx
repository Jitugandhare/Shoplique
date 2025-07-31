import React, { useEffect } from 'react'
import '../cartStyles/PaymentSuccess.css'
import PageTitle from '../components/PageTitle'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { toast } from "react-toastify"
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const PaymentSuccess = () => {
    const { loading, shippingInfo, cartItems } = useSelector(state => state.cart)
    const dispatch = useDispatch();


    const [searchParams] = useSearchParams();
    const reference = searchParams.get("reference")



    useEffect(() => {
        async function createOrderData() {
            try {
                const orderItem = JSON.parse(sessionStorage.getItem("orderItem"))
                const orderData = {
                    shippingInfo: {
                        address: shippingInfo.address,
                        city: shippingInfo.city,
                        state: shippingInfo.state,
                        country: shippingInfo.country,
                        pinCode: shippingInfo.pinCode,
                        phoneNo: shippingInfo.phoneNumber,

                    },
                    orderItems: cartItems.map((item) => ({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image,
                        product: item.product
                    })),

                    paymentInfo: {
                        id: reference,
                        status: "Succeeded"
                    },
                    itemPrice: orderItem.subtotal,
                    taxPrice: orderItem.tax,
                    shippingPrice: orderItem.shippingCharges,
                    totalPrice: orderItem.total,
                    paidAt: {

                    }
                }
                console.log("OrderData", orderData)

            } catch (error) {
                console.log("Order creation error", error)
                toast.error(error || "Order creation error", { position: "top-center", autoClose: 3000 })
            }
        }

        createOrderData()
    }, [])


    return (
        <>
            {
                loading ? (<Loader />) : (
                    <>
                        <PageTitle title="Payment Success" />
                        <NavBar />
                        <div className="payment-success-container">
                            <div className="success-content">
                                <div className="success-icon">
                                    <div className="checkmark">

                                    </div>

                                </div>
                                <h1>Order Confirmation</h1>
                                <p>Your payment wa successful . Reference ID :{" "}  <strong>{reference}</strong> </p>
                                <Link to="/order/my-orders" className='explore-btn'>View Orders</Link>
                            </div>
                        </div>

                        <Footer />
                    </>
                )
            }
        </>
    )
}

export default PaymentSuccess