import React, { useEffect, useState } from 'react';
import '../UserStyles/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, removeError, removeSuccess } from '../features/user/userSlice';
import PageTitle from '../components/PageTitle';
import { toast } from "react-toastify";



const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { loading, error, success, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: loginEmail, password: loginPassword }))

  }

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 })
      dispatch(removeError())
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Login Successful", { position: "top-center", autoClose: 3000 })
      dispatch(removeSuccess());
    }
    // navigate('/')
  }, [dispatch, success])


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  })


  return (
    <div className="form-container">
      <div className="form-content">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <div className="input-group">
            <input type="email" placeholder='Enter Email' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <input type="password" placeholder='Enter Password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
          </div>
          <button className="authBtn" type='submit'>Login</button>
          <p className="form-link">
            Forgot your password?<Link to='/forgot/password'> Reset here</Link>
          </p>
          <p className="form-link">
            Don't have an account?<Link to='/register'> Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login