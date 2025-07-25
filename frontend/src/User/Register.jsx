import React, { useEffect, useState } from 'react';
import '../UserStyles/Register.css';
import { Link, redirect, useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { register, removeError, removeSuccess } from '../features/user/userSlice';


const Register = () => {
  const { loading, error, success, isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  })

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./Profile/Profile.png")

  const handleRegisterChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      }

      reader.readAsDataURL(e.target.files[0])

    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill all the required fields", { position: "top-center", autoClose: 2000 })
    };

    const myForm = new FormData();
    myForm.set('name', name)
    myForm.set('email', email)
    myForm.set('password', password)
    myForm.set('avatar', avatar);

    dispatch(register(myForm))

  }
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 })
      dispatch(removeError())
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Registration Successful", { position: "top-center", autoClose: 3000 })
      dispatch(removeSuccess());
    }
    // navigate('/')
  }, [dispatch, success])

  return (
    <div className="form-container ">

      <PageTitle title="User Registration" />

      <div className="form-content">
        <form className="form" encType='multipart/form-data' onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="input-group">
            <input type="text" placeholder="Username" name="name" value={name} onChange={handleRegisterChange} />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Email" name="email" value={email} onChange={handleRegisterChange} />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" name="password" value={password} onChange={handleRegisterChange} />
          </div>

          <div className="input-group avatar-group">
            <input type="file" className="file-input" accept='image/' name='avatar' onChange={handleRegisterChange} />
            <img src={avatarPreview} alt="Preview iImage" className='avatar' />

          </div>

          <button className="authBtn" type='submit'>{loading ? "Signing Up" : "Sign Up"}</button>
          <p className="form-link">
            Already have an account?<Link to='/login'> Sign in here</Link>
          </p>



        </form>
      </div>
    </div>
  );

}
export default Register;
