import React, { useEffect } from 'react'
import '../AdminStyles/UserList.css'
import PageTitle from "../components/PageTitle"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link, useParams } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { clearMessage, deleteUserProfile, fetchUsers, removeError, removeSuccess } from '../features/admin/adminSlice'

const UsersList = () => {

    const { loading, error, users, success, message } = useSelector(state => state.admin);
    const dispatch = useDispatch();

    console.log(users)

    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this user?");
        if (confirm) {
            dispatch(deleteUserProfile(id))
        }

    }

    useEffect(() => {
        dispatch(fetchUsers())

    }, [dispatch])





    useEffect(() => {

        if (success) {
            toast.success(message || "User Deleted Successfully", { position: "top-center", autoClose: 3000 })
            dispatch(removeSuccess());
            dispatch(clearMessage());
            dispatch(fetchUsers())
        }


        if (error) {
            toast.error(error, { position: "top-center", autoClose: 3000 })
            dispatch(removeError());
        }
    }, [dispatch, error, success, message])



    return (
        <>
            {
                loading ? (<Loader />) : (<>
                    <PageTitle title="All User" />
                    <NavBar />


                    <div className="usersList-container">
                        <h1 className="usersList-title">All Users</h1>
                        <div className="usersList-table-container">
                            <table className="usersList-table">

                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {Array.isArray(users) && users.map((user, index) => (
                                        <tr key={user._id}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <Link className="action-icon edit-icon" to={`/admin/user/${user._id}`}>
                                                    <Edit />
                                                </Link>
                                                <Link className="action-icon delete-icon" onClick={() => handleDelete(user._id)}>
                                                    <Delete />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>

                            </table>
                        </div>


                    </div>

                    <Footer />




                </>)
            }
        </>
    )
}

export default UsersList