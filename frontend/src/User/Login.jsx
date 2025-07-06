import React, { useState } from 'react';
import '../UserStyles/Register.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
  }



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