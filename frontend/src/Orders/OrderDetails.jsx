import React, { useEffect } from 'react';
import '../OrderStyles/OrderDetails.css';
import PageTitle from '../components/PageTitle';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getOrderDetails, removeError } from '../features/order/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const OrderDetails = () => {
    const { loading, error, order } = useSelector(state => state.order);
    const dispatch = useDispatch();
    const { id } = useParams();

    
    const {
        shippingInfo = {},
        paymentInfo = {},
        orderItems = [],
        orderStatus,
        totalPrice,
        taxPrice,
        shippingPrice,
        itemPrice,
        paidAt
    } = order || {};

 
    const paymentStatus = paymentInfo.status === "succeed" ? "Paid" : "Not Paid";
    const finalOrderStatus = paymentStatus === "Not Paid" ? "Cancelled" : orderStatus;


    const safeStatus = finalOrderStatus?.toLowerCase().replace(/\s+/g, '-');
    const orderStatusClass = `status-tag ${safeStatus}`;
    const paymentStatusClass = `pay-tag ${paymentStatus === 'Paid' ? "paid" : "not-paid"}`;

    
    useEffect(() => {
        dispatch(getOrderDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-center", autoClose: 3000 });
            dispatch(removeError());
        }
    }, [error, dispatch]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <PageTitle title="Order Details" />
                    <NavBar />

                    <div className="order-box">
                        <div className="order-header">
                            <h1>Order Details</h1>
                            <p><strong>Order ID:</strong> {id}</p>
                            <Link to="/order/my-orders" className="back-link">← Back to Orders</Link>
                        </div>

                        <div className="table-block">
                            <h2 className="table-title">Order Items</h2>
                            <table className="table-main">
                                <thead>
                                    <tr className="table-head">
                                        <th className="head-cell">Image</th>
                                        <th className="head-cell">Name</th>
                                        <th className="head-cell">Quantity</th>
                                        <th className="head-cell">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems.map((item) => (
                                      
                                        <tr className='table-row' key={item._id}>
                                            <td className='table-cell'><img className='item-img' src={item.image} alt={item.name} /></td>
                                            <td className='table-cell'>{item.name}</td>
                                            <td className='table-cell'>{item.quantity}</td>
                                            <td className='table-cell'>{item.price}/-</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Shipping Info */}
                        <div className="table-block">
                            <h2 className="table-title">Shipping Info</h2>
                            <table className="table-main">
                                <tbody>
                                    <tr className="table-row">
                                        <th className="table-cell">Address</th>
                                        <td className="table-cell">
                                            {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country} - {shippingInfo.pinCode}
                                        </td>
                                    </tr>
                                    <tr className="table-row">
                                        <th className="table-cell">Phone</th>
                                        <td className="table-cell">{shippingInfo.phoneNo}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Order Summary */}
                        <div className="table-block">
                            <h2 className="table-title">Order Summary</h2>
                            <table className="table-main">
                             
                             
                                <tbody>
                                    <tr className="table-row">
                                        <th className="table-cell">Order Status</th>
                                        <td className="table-cell">
                                            <span className={orderStatusClass}>{finalOrderStatus}</span>
                                        </td>
                                    </tr>

                                    <tr className="table-row">
                                        <th className="table-cell">Payment Status</th>
                                        <td className="table-cell">
                                            <span className={paymentStatusClass}>{paymentStatus}</span>
                                        </td>
                                    </tr>

                                    <tr className="table-row">
                                        <th className="table-cell">Paid At</th>
                                        <td className="table-cell">
                                           
                                            <span className="pay-tag">
                                                {paidAt ? new Date(paidAt).toLocaleString() : "Not available"}
                                            </span>
                                        </td>
                                    </tr>

                                    <tr className="table-row">
                                        <th className="table-cell">Items Price</th>
                                        <td className="table-cell">
                                            <span className="pay-tag">{itemPrice}/-</span>
                                        </td>
                                    </tr>

                                    <tr className="table-row">
                                        <th className="table-cell">Tax Price</th>
                                        <td className="table-cell">
                                            <span className="pay-tag">{taxPrice}/-</span>
                                        </td>
                                    </tr>

                                    <tr className="table-row">
                                        <th className="table-cell">Shipping Price</th>
                                        <td className="table-cell">
                                            <span className="pay-tag">{shippingPrice}/-</span>
                                        </td>
                                    </tr>

                                    <tr className="table-row">
                                        <th className="table-cell">Total Price</th>
                                        <td className="table-cell">
                                            <span className="pay-tag">{totalPrice}/-</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Footer />
                </>
            )}
        </>
    );
};

export default OrderDetails;
