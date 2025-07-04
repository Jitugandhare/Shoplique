import React, { useEffect, useState } from 'react'
import "../pageStyles/Products.css"
import PageTitle from "../components/PageTitle"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { getProduct, removeError } from '../features/product/productSlice'
import { useSelector, useDispatch } from 'react-redux'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom';
import NoProducts from '../components/NoProducts'
import Pagination from '../components/Pagination'

const Products = () => {
    const { loading, error, products, totalPages } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get('keyword')
    console.log(keyword)

    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        dispatch(getProduct({ keyword, page: currentPage }))
    }, [dispatch, keyword, currentPage]);


    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: "top-center", autoClose: 3000 })
        }
        dispatch(removeError())
    }, [dispatch, error])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    if (loading) {
        return (
            <>
                <NavBar />
                <Loader />
                <Footer />
            </>
        )
    }


    return (
        <>
            <PageTitle title="All Products" />
            <NavBar />
            <div className="products-layout">
                <div className="filter-section">
                    <h3 className="filter-heading">Categories</h3>
                    {/* Render all categories */}
                    <ul>
                        <li>Shirt</li>
                        <li>Jeans</li>
                        <li>Jackets</li>
                        <li>Laptop</li>
                        <li>Mobile</li>
                        <li>Glasses</li>

                    </ul>

                </div>

                <div className="products-section">
                    {
                        products.length > 0 ? (
                            <>
                                <div className="products-product-container">

                                    {products.map((product) => (
                                        <Product product={product} key={product._id} />
                                    ))}

                                </div>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}

                                />

                            </>


                        ) : (
                            <NoProducts keyword={keyword} />
                        )
                    }

                </div>


            </div>



            <Footer />
        </>
    )
}

export default Products