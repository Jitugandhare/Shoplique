import React, { useEffect } from 'react'
import "../AdminStyles/OrderList.css"
import PageTitle from "../components/PageTitle"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { clearMessage, deleteOrder, fetchAllOrders, removeError, removeSuccess } from '../features/admin/adminSlice'

import { toast } from 'react-toastify'
import { Delete, Edit } from '@mui/icons-material'



const OrderList = () => {
    const { loading, error, success, orders, message, totalAmount } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(orders)
    useEffect(() => {
        dispatch(fetchAllOrders())
    }, [dispatch])

    useEffect(() => {
        if (error) {
            toast.error(error || "Failed to fetch orders", { position: "top-center", autoClose: 3000 });
            dispatch(removeError());

        }
        if (success) {
            toast.success(message || "Orders Fetched Successfully", { position: "top-center", autoClose: 3000 })
            dispatch(removeSuccess());
            dispatch(clearMessage())
            dispatch(fetchAllOrders())

        }
    }, [dispatch, success, error, message])



    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure to delete this order?")
        if (confirm) {
            dispatch(deleteOrder(id))
        }

    }

    return (
        <>
            {loading ?

                (<Loader />) : (

                    <>
                        <PageTitle title="All Orders" />
                        <NavBar />
                        <div className="ordersList-container">
                            <h1 className="ordersList-title">All Orders</h1>
                            {
                                orders && orders.length === 0 && (
                                    <div className="no-orders-container">
                                        <p>No Order Found.</p>
                                    </div>
                                )
                            }
                            <div className="ordersList-table-container">
                                <table className='ordersList-table'>
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>Order Id</th>
                                            <th>Status</th>
                                            <th>Total Price</th>
                                            <th>Number Of Items</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders && orders.map((order, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{order._id}</td>
                                                    <td className={`order-status ${order.orderStatus.toLowerCase()}`}
                                                    >{order.orderStatus}</td>
                                                    <td>{order.totalPrice.toFixed(2)}/-</td>
                                                    <td>{order.orderItems.length}</td>
                                                    <td>
                                                        <Link to={`/admin/order/${order._id}`} className='action-icon edit-icon'><Edit /> </Link>
                                                        <button onClick={() => handleDelete(order._id)} className="action-icon delete-icon"><Delete /> </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <Footer />

                    </>
                )}
        </>
    )
}

export default OrderList