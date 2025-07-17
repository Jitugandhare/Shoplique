import React from 'react'
import "../AdminStyles/Dashboard.css";
import PageTitle from "../components/PageTitle"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { AddBox, AttachMoney, CheckCircle, Dashboard as DashboardIcon, Error, Inventory, People, ShoppingCart, Star } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <>
            <PageTitle title="Admin Dashboard" />
            <NavBar />
            <div className="dashboard-container">
                <div className="sidebar">
                    <div className="logo">
                        <DashboardIcon className='logo-icon' />
                        Admin Dashboard
                    </div>
                    <nav className="nav-menu">
                        <div className="nav-section">
                            <h3>Products</h3>
                            <Link to="/admin/products" >
                                <Inventory className='nav-icon' />
                                All Products
                            </Link>
                            <Link to="/admin/create-product" >
                                <AddBox className='nav-icon' />
                                Create Product
                            </Link>
                        </div>


                        <div className="nav-section">
                            <h3>Users</h3>
                            <Link to="/admin/users" >
                                <People className='nav-icon' />
                                All Users
                            </Link>
                        </div>

                        <div className="nav-section">
                            <h3>Orders</h3>
                            <Link to="/admin/orders" >
                                <ShoppingCart className='nav-icon' />
                                All Orders
                            </Link>
                        </div>

                        <div className="nav-section">
                            <h3>Reviews</h3>
                            <Link to="/review" >
                                <Star className='nav-icon' />
                                All Reviews
                            </Link>
                        </div>
                    </nav>
                </div>

                <div className="main-content">
                    <div className="stats-grid">
                        <div className="stat-box">
                            <Inventory className='icon' />
                            <h3>Total Products </h3>
                            <p>4</p>
                        </div>

                        <div className="stat-box">
                            <ShoppingCart className='icon' />
                            <h3>Total Orders </h3>
                            <p>4</p>
                        </div>

                        <div className="stat-box">
                            <Star className='icon' />
                            <h3>Total Reviews </h3>
                            <p>4</p>
                        </div>

                        <div className="stat-box">
                            <AttachMoney className='icon' />
                            <h3>Total Revenue </h3>
                            <p>400/-</p>
                        </div>

                        <div className="stat-box">
                            <Error className='icon' />
                            <h3>Out Of Stocks </h3>
                            <p>2</p>
                        </div>


                        <div className="stat-box">
                            <CheckCircle className='icon' />
                            <h3>In Stocks </h3>
                            <p>51</p>
                        </div>



                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard