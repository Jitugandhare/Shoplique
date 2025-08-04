import React, { useEffect } from 'react'
import "../AdminStyles/ProductList.css"
import PageTitle from "../components/PageTitle"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import { Link } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, fetchAdminProducts, removeError } from '../features/admin/adminSlice'
import { toast } from 'react-toastify'

const ProductList = () => {
  const { loading, products, error, deleting } = useSelector((state) => state.admin);

  const dispatch = useDispatch();




  const handleDeleteProduct = (id) => {
    const isConfirm = window.confirm("Are you sure you want to delete this product?")
    if (isConfirm) {
      dispatch(deleteProduct(id)).then((action) => {
        if (action.type === "admin/deleteProduct/fulfilled") {
          toast.success("Product Deleted Successfully", {
            position: "top-center", autoClose: 3000
          })
        }
      })

    }
  }


  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);


  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 })
    }
    dispatch(removeError())
  }, [dispatch, error])


  if (!products || products.length === 0) {
    <div className="no-admin-products">
      <h1 className="product-list-title">All Products</h1>
      <p className="loading-message">
        No Products Found...
      </p>
    </div>
  }

  return (
    <>
      {
        loading ? (<Loader />) : (
          <>
            <PageTitle title="All Products" />
            <NavBar />
            <div className="product-list-container ">
              <h1 className="product-list-title">All Products</h1>
              <table className="product-table">
                <thead>
                  <tr>
                    <th> Sl.No.  </th>
                    <th> Product Image  </th>
                    <th>  Product Name  </th>
                    <th> Price  </th>
                    <th> Ratings  </th>
                    <th> Category  </th>
                    <th> Stock  </th>
                    <th> Created At  </th>
                    <th> Actions  </th>

                  </tr>
                </thead>


                <tbody>
                  {products.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={item.image?.[0]?.url || '/Profile/profile.png'}
                          alt={item.name || "Product Image"}
                          className="admin-product-image"
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>₹{item.price}</td>
                      <td>{item.ratings}</td>
                      <td>{item.category}</td>
                      <td>{item.stock}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>

                        <Link to={`/admin/product/${item._id}`} className="action-icon edit-icon"
                          disabled={loading}
                        ><Edit /></Link>


                        <button className="action-icon delete-icon" onClick={() => handleDeleteProduct(item._id)}
                          disabled={deleting[item._id]}
                        >
                          {deleting[item._id] ? <Loader /> : <Delete />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>



              </table>





            </div>

            <Footer />
          </>
        )
      }
    </>
  )
}

export default ProductList