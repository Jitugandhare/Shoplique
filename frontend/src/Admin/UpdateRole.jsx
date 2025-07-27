import React, { use, useEffect, useState } from 'react';
import '../AdminStyles/UpdateRole.css';
import PageTitle from "../components/PageTitle";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleUser } from '../features/admin/adminSlice';
import { set } from 'mongoose';


const UpdateRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, user, success } = useSelector((state) => state.admin);
  console.log(user)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  })

  const { name, email, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }



  useEffect(() => {
    dispatch(getSingleUser(id))
  }, [dispatch, id])



  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
      })
    }
  }, [user])

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <PageTitle title="Update Role" />
          <NavBar />

          <div className="page-wrapper">
            <div className="update-user-role-container">
              <h1 className='update-user-title' >Update User Role</h1>
              <form className="update-user-role-form" >
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id='name' name='name' value={name} readOnly />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id='email' name='email' value={email} readOnly />
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select id='role' value={role} onChange={handleChange} name='role' required>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <button type="submit" className="btn">Update Role</button>
              </form>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default UpdateRole;
