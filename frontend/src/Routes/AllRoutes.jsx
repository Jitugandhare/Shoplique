import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'
import Products from '../pages/Products'
import Register from '../User/Register'
import Login from '../User/Login';
import Profile from '../User/Profile';
import ProtectedRoutes from '../components/ProtectedRoutes';




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

                <Route path='/user/profile' element={<ProtectedRoutes element={<Profile />} />} />



            </Routes>


        </div>
    )
}

export default AllRoutes