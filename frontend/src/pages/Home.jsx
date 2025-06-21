import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import "../pageStyles/Home.css"

import Footer from '../components/Footer'
import ImageSlider from '../components/ImageSlider'
import Product from '../components/Product'
import PageTitle from '../components/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../features/product/productSlice'


const Home = () => {
    const { products, loading, error, productCount } = useSelector((state) => state.product) || [];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    return (

        <>
            <NavBar />
            <PageTitle title="my-website" />
            <ImageSlider />
            <div className="home-container">
                <h2 className="home-heading">Trending Now</h2>
                <div className="home-product-container">
                    {
                        products?.map((product) => (
                            <Product key={product._id}
                                product={product}
                            />
                        ))
                    }
                </div>
            </div>
            {/* <Footer /> */}
        </>

    )
}

export default Home