import React, { useEffect, useState } from 'react'
import "../AdminStyles/UpdateOrder.css"
import PageTitle from "../components/PageTitle"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails } from '../features/order/orderSlice';
import { useSelector, useDispatch } from "react-redux";

import { toast } from 'react-toastify'




const UpdateOrder = () => {
    
    const { loading: orderLoading, order } = useSelector((state) => state.order);
    const { loading: adminLoading, error, success } = useSelector((state) => state.admin);
    const loading = orderLoading || adminLoading;

    const dispatch = useDispatch();
    const [status, setStatus] = useState("");
    const { id } = useParams();


    console.log(order)

    const {
        shippingInfo = {},
        orderItems = [],
        paymentInfo = {},
        totalPrice,
        orderStatus,
    } = order;

    useEffect(() => {
        dispatch(getOrderDetails(id))
    }, [dispatch, id])


    return (
        <>
            {loading ? (<Loader />) : (

                <>
                    <PageTitle title="Update Order Status" />
                    <NavBar />
                    <div className="order-container">
                        <h1 className="order-title">Update Order</h1>
                        <div className="order-details">
                            <h2>Order Information</h2>
                            <p><strong>Order Id :</strong>{id}</p>
                            <p><strong>Shipping Address :</strong>{shippingInfo.address}, {shippingInfo.city},
                                {shippingInfo.state},
                                {shippingInfo.country},
                                {shippingInfo.pinCode}</p>
                            <p><strong>Phone :</strong>{shippingInfo.phoneNo}</p>
                            <p><strong>Order Status : </strong>{orderStatus}</p>
                            <p><strong>Payment Status :</strong>{paymentInfo.status}</p>
                            <p><strong>Total Price :</strong>{totalPrice}/-</p>


                        </div>


                        <div className="order-items">
                            <h2>Order Items</h2>
                            <table className="order-table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>

                                </thead>


                                <tbody>
                                    {
                                        orderItems.map((item) => (

                                            <tr key={item._id}>
                                                <td>
                                                    <img src={item.image} alt={item.name} className='order-item-image' /></td>
                                                <td>{item.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.price}/-</td>
                                            </tr>
                                        ))

                                    }
                                </tbody>
                            </table>


                        </div>

                        <div className="order-status">
                            <h2>Update Order Status</h2>
                            <select className='status-select' value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Select Status</option>
                                <option value="shipped" > Shipped</option>
                                <option value="on the way">On The Way</option>
                                <option value="delivered">Delivered</option>

                            </select>
                            <button className="update-button">Update Status</button>



                        </div>

                    </div>




                    <Footer />

                </>
            )}
        </>
    )
}

export default UpdateOrder