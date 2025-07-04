import React, { useState } from 'react';
import '../UserStyles/Register.css';
import { Link, redirect } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

const Register = () => {
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

  return (
    <div className="form-container ">

      <PageTitle title="User Registration" />

      <div className="form-content">
        <form className="form" encType='multipart/form-data'>
          <h2>Sign Up</h2>
          <div className="input-group">
            <input type="text" placeholder="Username" name="name" value={name} onChange={handleRegisterChange} />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Email" name="email" value={email} onChange={handleRegisterChange} />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" name="password" value={password} onChange={handleRegisterChange} />
          </div>

          <div className="input-group avatar-group">
            <input type="file" className="file-input" accept='image/' name='avatar' onChange={handleRegisterChange} />
            <img src={avatarPreview} alt="Preview iImage" className='avatar' />

          </div>

          <button className="authBtn">SingUp</button>
          <p className="form-link">
            Already have an account?<Link to='/login'> Sign in here</Link>
          </p>



        </form>
      </div>
    </div>
  );

}
export default Register;
