import React, { useEffect } from 'react';
import "../OrderStyles/MyOrders.css";
import PageTitle from '../components/PageTitle';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { getAllMyOrders, removeError, removeMessage, removeSuccess } from '../features/order/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { LaunchOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';

const MyOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success, orders} = useSelector(state => state.order);

    useEffect(() => {
        dispatch(getAllMyOrders());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            toast.success("Your Order List Fetched Successfully", {
                position: "top-center",
                autoClose: 3000,
            });
            dispatch(removeSuccess());

        }

        if (error) {
            toast.error(error || "Failed to Fetch Orders", {
                position: "top-center",
                autoClose: 3000,
            });

            dispatch(removeError());
        }
    }, [dispatch, error, success]);

    return (
        <>
            <PageTitle title="My Orders" />
            <NavBar />
            {loading ? (
                <Loader />
            ) : (
                <>
                    {orders.length > 0 ? (
                        <div className="my-orders-container">
                            <h1>My Orders</h1>
                            <div className="table-responsive">
                                <table className="orders-table">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Items Count</th>
                                            <th>Status</th>
                                            <th>Total Price</th>
                                            <th>View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((item) => (
                                            <tr key={item._id}>
                                                <td>{item._id}</td>
                                                <td>{item.orderItems.length}</td>
                                                <td>
                                                    <span className={`status-badge ${item.orderStatus.toLowerCase()}`}>
                                                        {item.orderStatus}
                                                    </span>
                                                </td>
                                                <td>{item.totalPrice}/-</td>
                                                <td>
                                                    <Link to={`/order/${item._id}`} className='order-link'>
                                                        <LaunchOutlined />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="no-orders">
                            <p className="no-order-message">No Order Found</p>
                        </div>
                    )}
                </>
            )}
            <Footer />
        </>
    );
};

export default MyOrders;
