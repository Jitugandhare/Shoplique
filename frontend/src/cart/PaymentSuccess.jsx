import React, { useEffect } from 'react'
import '../cartStyles/PaymentSuccess.css'
import PageTitle from '../components/PageTitle'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { toast } from "react-toastify"
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, removeError, removeSuccess } from '../features/order/orderSlice'
import { clearCart } from '../features/cart/cartSlice'

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const { loading, success, error, message } = useSelector(state => state.order);

    const [searchParams] = useSearchParams();
    const reference = searchParams.get("reference");

    useEffect(() => {
        async function createOrderData() {
            try {
                const orderItem = JSON.parse(sessionStorage.getItem("orderItem"));

                if (!orderItem || !reference || !shippingInfo || cartItems.length === 0) {
                    // toast.error("Missing order data. Redirecting...", { position: "top-center", autoClose: 3000 });
                    navigate("/cart");
                    return;
                }

                const orderData = {
                    shippingInfo: {
                        address: shippingInfo.address,
                        city: shippingInfo.city,
                        state: shippingInfo.state,
                        country: shippingInfo.country,
                        pinCode: shippingInfo.pinCode,
                        phoneNo: shippingInfo.phoneNumber,
                    },
                    orderItems: cartItems.map(item => ({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image,
                        product: item.product,
                    })),
                    paymentInfo: {
                        id: reference,
                        status: "Succeeded"
                    },
                    itemPrice: orderItem.subtotal,
                    taxPrice: orderItem.tax,
                    shippingPrice: orderItem.shippingCharges,
                    totalPrice: orderItem.total,
                    paidAt: new Date().toISOString()
                };

                dispatch(createOrder(orderData));
                console.log("OrderData", orderData);
                sessionStorage.removeItem("orderItem");
            } catch (error) {
                console.log("Order creation error", error);
                toast.error("Order creation error", { position: "top-center", autoClose: 3000 });
            }
        }

        createOrderData();
    }, [dispatch, reference, shippingInfo, cartItems, navigate]);



    useEffect(() => {
        if (error) {
            toast.error(error || "Failed to place order", { position: "top-center", autoClose: 3000 });
            dispatch(removeError());
        }
        if (success) {
            toast.success(message || "Order placed successfully", { position: "top-center", autoClose: 3000 });
            dispatch(clearCart());
            dispatch(removeSuccess());
        }
    }, [dispatch, success, error, message]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <PageTitle title="Payment Success" />
                    <NavBar />
                    <div className="payment-success-container">
                        <div className="success-content">
                            <div className="success-icon">
                                <div className="checkmark"></div>
                            </div>
                            <h1>Order Confirmation</h1>
                            <p>Your payment was successful. Reference ID:{" "}
                                <strong>{reference}</strong>
                            </p>
                            <Link to="/order/my-orders" className='explore-btn'>View Orders</Link>
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
}

export default PaymentSuccess;
