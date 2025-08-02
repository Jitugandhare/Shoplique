import React, { useEffect } from 'react'
import '../AdminStyles/ReviewList.css'
import PageTitle from "../components/PageTitle"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import { Link } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from "react-redux";
import { fetchAdminProducts, fetchAllReviews, removeError } from '../features/admin/adminSlice'
import { toast } from 'react-toastify'



const ReviewList = () => {

    const { products, loading, error } = useSelector(state => state.admin)
    const dispatch = useDispatch();

    console.log(products)

    useEffect(() => {
        dispatch(fetchAdminProducts())
    }, [dispatch])

    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeError())
        }
    }, [dispatch, error])


    if (!products || products.length === 0) {
        return (
            <>
                <NavBar />
                <div className="reviews-list-container">
                    <h1 className="reviews-list-title">Admin Reviews</h1>
                    <p>No products Found</p>
                </div>

            </>
        )
    }


    return (
        <>
            {
                loading ? (<Loader />) : (
                    <>
                        <PageTitle title="Reviews List" />
                        <NavBar />

                        <div className="reviews-list-container">
                            <h1 className="reviews-list-title">Product Reviews</h1>
                            <table className="reviews-table">

                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Product Name</th>
                                        <th>Product Image</th>
                                        <th>Number Of Reviews</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((item, index) => (
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                <img
                                                    className='product-image'
                                                    src={item.image[0].url}
                                                    alt={item.name}
                                                />
                                            </td>
                                            <td>{item.numOfReviews}</td>
                                            <td>
                                                <button
                                                    className='action-btn view-btn'

                                                >
                                                    View Reviews
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>


                            {/* reviews of product */}
                            <div className="reviews-details">
                                <h2>Reviews For Product</h2>
                                <table className="reviews-table">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Reviewer Name</th>
                                            <th>Rating</th>
                                            <th>Comment</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>jitu</td>
                                            <td>5</td>
                                            <td>comment hai</td>
                                            <td>

                                                <button className='action-btn delete-btn'>
                                                    <Delete />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <Footer />

                    </>

                )
            }

        </>


    )
}

export default ReviewList