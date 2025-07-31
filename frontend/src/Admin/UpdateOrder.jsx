import React, { useState } from 'react'
import "../AdminStyles/UpdateOrder.css"
import PageTitle from "../components/PageTitle"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import { Link, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";

import { toast } from 'react-toastify'




const UpdateOrder = () => {
    const { loading, error, success, message, orders } = useSelector((state) => state.order);

    const dispatch = useDispatch();
    const [status, setStatus] = useState("");
    const {id}=useParams()


    return (
        <>
            {loading ? (<Loader />) : (

                <>
                    <PageTitle title="Update Order Status" />
                    <NavBar />
                    <div className="order-container">
                        <h1 className="order-title">Update Order                </h1>
                        <div className="order-details">
                            <h2>Order Information</h2>
                            <p><strong>Order Id :</strong>1234</p>
                            <p><strong>Shipping Address :</strong>Indore</p>
                            <p><strong>Phone :</strong>255455</p>
                            <p><strong>Order Status : </strong>Processing</p>
                            <p><strong>Payment Status :</strong>Paid</p>
                            <p><strong>Total Price :</strong>950/-</p>


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
                                    <tbody>
                                        <tr>
                                            <td className='order-item-image' ><img src="" alt="Product-Image" /></td>
                                            <td>Product Name</td>
                                            <td>4</td>
                                            <td>950/-</td>
                                        </tr>
                                    </tbody>
                                </thead>
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