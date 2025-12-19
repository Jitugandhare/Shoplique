import React, { useEffect, useState } from "react";
import "../UserStyles/Registers.css";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  removeError,
  removeSuccess,
} from "../features/user/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    "/Profile/Profile.png"
  );

  const { name, email, password } = user;

  const handleRegisterChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar" && files?.length) {
      const file = files[0];
      setAvatar(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      return;
    }

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all required fields",{ position: "top-center", autoClose: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("email", email.trim());
    formData.append("password", password);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error,{ position: "top-center", autoClose: 3000 });
      dispatch(removeError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Registration Successful",{ position: "top-center", autoClose: 3000 });
      dispatch(removeSuccess());
      navigate("/login");
    }
  }, [success, dispatch, navigate]);

  return (
    <div className="form-container">
      <PageTitle title="User Registration" />

      <div className="form-content">
        <form
          className="form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2>Sign Up</h2>

          <input
            type="text"
            placeholder="Username"
            name="name"
            value={name}
            onChange={handleRegisterChange}
            required
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleRegisterChange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleRegisterChange}
            required
          />

          <div className="avatar-group">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleRegisterChange}
            />
            <img src={avatarPreview} alt="Avatar Preview" />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p>
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
