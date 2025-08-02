import React, { useEffect, useState } from 'react'
import "../AdminStyles/UpdateOrder.css"
import PageTitle from "../components/PageTitle"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails } from '../features/order/orderSlice';
import { removeError, removeSuccess, updateOrderStatus } from '../features/admin/adminSlice'
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

    const paymentStatus = paymentInfo?.status === "Succeeded" ? "Paid" : "Not Paid";
    const finalOrderStatus = paymentStatus === "Not Paid" ? "Cancelled" : orderStatus;


    const handleStatusUpdate = () => {
        if (!status) {
            toast.error("Please Select Status", { position: "top-center", autoClose: 3000 });
            return;
        }
        dispatch(updateOrderStatus({ id, status }))
    }


    useEffect(() => {
        dispatch(getOrderDetails(id))
    }, [dispatch, id])

    useEffect(() => {
        if (error) {
            toast.error("Failed to update order status", { position: "top-center", autoClose: 3000 });
            dispatch(removeError());

        }
        if (success) {
            toast.success("Order Status Updated Successfully", { position: "top-center", autoClose: 3000 })
            dispatch(removeSuccess())
            dispatch(getOrderDetails(id))
        }
    }, [dispatch, success, error])

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
                            <p><strong>Order Status : </strong>{finalOrderStatus}</p>
                            <p><strong>Payment Status :</strong>{paymentStatus}</p>
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
                            <select className='status-select' value={status}
                                disabled={loading || orderStatus === "Delivered"}
                                onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Select Status</option>
                                <option value="Shipped" > Shipped</option>
                                <option value="On The Way">On The Way</option>
                                <option value="Delivered">Delivered</option>

                            </select>
                            <button className="update-button" disabled={loading || orderStatus === "Delivered" || !status}
                                onClick={handleStatusUpdate}>{loading ? "Updating..." : "Update Status"}</button>



                        </div>

                    </div>




                    <Footer />

                </>
            )}
        </>
    )
}

export default UpdateOrder