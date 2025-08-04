import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'
import Products from '../pages/Products'
import Register from '../User/Register'
import Login from '../User/Login';
import Profile from '../User/Profile';
import ProtectedRoutes from '../components/ProtectedRoutes';
import UpdateProfile from '../User/UpdateProfile';
import UpdatePassword from '../User/UpdatePassword';
import ForgotPassword from '../User/ForgotPassword';
import ResetPassword from '../User/ResetPassword';
import Cart from '../cart/Cart';
import Shipping from '../cart/Shipping';
import OrderConfirm from '../cart/OrderConfirm';
import Payment from '../cart/Payment';
import Dashboard from '../Admin/Dashboard';
import ProductList from '../Admin/ProductList';
import Product from '../Admin/Product';
import UpdateProduct from '../Admin/UpdateProduct';
import UsersList from '../Admin/UsersList';
import UpdateRole from '../Admin/UpdateRole';
import OrderList from '../Admin/OrderList';
import UpdateOrder from '../Admin/UpdateOrder';
import PaymentSuccess from '../cart/PaymentSuccess';
import MyOrders from '../Orders/MyOrders';
import OrderDetails from '../Orders/OrderDetails';
import ReviewList from '../Admin/ReviewList';




const AllRoutes = () => {



    return (
        <div>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/product-details/:id' element={<ProductDetails />} />
                <Route path='/products' element={<Products />} />
                <Route path='/products/:keyword' element={<Products />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />

                <Route path='/user/forgot/password' element={<ForgotPassword />} />
                <Route path='/user/reset/:token' element={<ResetPassword />} />

                <Route path='/user/profile' element={<ProtectedRoutes element={<Profile />} />} />
                <Route path='/user/profile/update' element={<ProtectedRoutes element={<UpdateProfile />} />} />
                <Route path='/user/password/update' element={<ProtectedRoutes element={<UpdatePassword />} />} />
                <Route path='/cart' element={<Cart />} />

                <Route path='/shipping' element={<ProtectedRoutes element={<Shipping />} />} />
                <Route path='/order/confirm' element={<ProtectedRoutes element={<OrderConfirm />} />} />
                <Route path='/process/payment' element={<ProtectedRoutes element={<Payment />} />} />
                <Route path='/paymentSuccess' element={<ProtectedRoutes element={<PaymentSuccess />} />} />

                <Route path='/order/my-orders' element={<ProtectedRoutes element={<MyOrders />} />} />
                <Route path='/order/:id' element={<ProtectedRoutes element={<OrderDetails />} />} />

                {/* Admin Routes */}
                <Route path='/admin/dashboard' element={<ProtectedRoutes element={<Dashboard />} adminOnly={true} />} />
                <Route path='/admin/products' element={<ProtectedRoutes element={<ProductList />} adminOnly={true} />} />
                <Route path='/admin/create-product' element={<ProtectedRoutes element={<Product />} adminOnly={true} />} />
                <Route path='/admin/product/:id' element={<ProtectedRoutes element={<UpdateProduct />} adminOnly={true} />} />
                <Route path='/admin/users' element={<ProtectedRoutes element={<UsersList />} adminOnly={true} />} />
                <Route path='/admin/user/:id' element={<ProtectedRoutes element={<UpdateRole />} adminOnly={true} />} />
                <Route path='/admin/orders' element={<ProtectedRoutes element={<OrderList />} adminOnly={true} />} />
                <Route path='/admin/reviews' element={<ProtectedRoutes element={<ReviewList />} adminOnly={true} />} />


                <Route path='/admin/order-status/:id' element={<ProtectedRoutes element={<UpdateOrder />} adminOnly={true} />} />




            </Routes>


        </div>
    )
}

export default AllRoutes