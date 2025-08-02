import React, { useEffect, useState } from 'react'
import '../AdminStyles/ReviewList.css'
import PageTitle from "../components/PageTitle"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import { Link, useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from "react-redux";
import { clearMessage, deleteReview, fetchAdminProducts, fetchAllReviews, removeError, removeSuccess } from '../features/admin/adminSlice'
import { toast } from 'react-toastify'



const ReviewList = () => {

    const { products, loading, error, reviews, success, message } = useSelector(state => state.admin)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null);


    const handleViewReviews = (productId) => {
        setSelectedProduct(productId);
        dispatch(fetchAllReviews({ productId }))
    }

    const handleReviewDelete = (productId, reviewId) => {
        const confirm = window.confirm("Are you sure to delete this review?")
        if (confirm) {
            dispatch(deleteReview({ productId, reviewId }))
        }
    }


    useEffect(() => {
        dispatch(fetchAdminProducts())
    }, [dispatch]);



    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeError())
        }
        if (success) {
            toast.success(message, { position: 'top-center', autoClose: 3000 })
            dispatch(removeSuccess());
            dispatch(clearMessage());
                        
        }

    }, [dispatch, error, success, message])


    



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
                                                {
                                                    item.numOfReviews > 0
                                                    &&
                                                    (
                                                        <button
                                                            className='action-btn view-btn'
                                                            onClick={() => handleViewReviews(item._id)}
                                                        >
                                                            View Reviews
                                                        </button>
                                                    )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>


                            {/* reviews of product */}
                            {selectedProduct && reviews && reviews.length > 0 &&
                                (
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
                                                {
                                                    reviews.map((review, index) => (

                                                        <tr key={review._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{review.name}</td>
                                                            <td>{review.rating}</td>
                                                            <td>{review.comment}</td>
                                                            <td>

                                                                <button className='action-btn delete-btn'
                                                                    onClick={() => handleReviewDelete(selectedProduct, review._id)}
                                                                >
                                                                    <Delete />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                        </div>
                        <Footer />

                    </>

                )
            }

        </>


    )
}

export default ReviewList