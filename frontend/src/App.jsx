import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product-details/:id' element={<ProductDetails />} />
          <Route path='/products' element={<Products />} />


        </Routes>
      </Router>
    </>
  )
}

export default App