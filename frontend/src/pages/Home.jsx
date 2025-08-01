import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import "../pageStyles/Home.css"
import Footer from '../components/Footer'
import ImageSlider from '../components/ImageSlider'
import Product from '../components/Product'
import PageTitle from '../components/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, removeError } from '../features/product/productSlice'
import Loader from '../components/Loader'
import { toast } from "react-toastify"


const Home = () => {
    const { products, loading, error, productCount } = useSelector((state) => state.product) || {};
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct({ keyword: "" }))
    }, [dispatch]);


    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: "top-center", autoClose: 3000 })
        }
        dispatch(removeError())
    }, [dispatch, error])

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <NavBar />
                    <PageTitle title="my-website" />
                    <ImageSlider />
                    <div className="home-container">
                        <h2 className="home-heading">Trending Now</h2>
                        {error && <div className="error-message">{error}</div>}
                        <div className="home-product-container">
                            {products?.map((product) => (
                                <Product key={product._id} product={product} />
                            ))}
                        </div>
                    </div>

                    <Footer />
                </>
            )}
        </>
    )
}

export default Home
