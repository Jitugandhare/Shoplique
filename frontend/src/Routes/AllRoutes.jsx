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
import Cart from '../Cart/Cart';
import Shipping from '../cart/Shipping';
import OrderConfirm from '../cart/OrderConfirm';
import Payment from '../cart/Payment';
import Dashboard from '../Admin/Dashboard';
import ProductList from '../Admin/ProductList';




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
                {/* Admin Routes */}
                <Route path='/admin/dashboard' element={<ProtectedRoutes element={<Dashboard />} adminOnly={true}/>}  />
                <Route path='/admin/products' element={<ProtectedRoutes element={<ProductList />} adminOnly={true}/>}  />



            </Routes>


        </div>
    )
}

export default AllRoutes