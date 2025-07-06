import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'
import Products from '../pages/Products'
import Register from '../User/Register'
import Login from '../User/Login';


const AllRoutes = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/product-details/:id' element={<ProductDetails />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/products/:keyword' element={<Products />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />


                </Routes>
            </Router>
        </div>
    )
}

export default AllRoutes