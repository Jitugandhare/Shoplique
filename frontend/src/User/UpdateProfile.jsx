import React, { useEffect, useState } from 'react';
import "../UserStyles/Form.css";
import PageTitle from "../components/PageTitle";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { removeError, removeSuccess, updateProfile } from '../features/user/userSlice';

const UpdateProfile = () => {
    const { loading, error, message, success, user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState(""); 
    const [avatarPreview, setAvatarPreview] = useState("./Profile/Profile.png");

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setAvatarPreview(user.avatar?.url || "./Profile/Profile.png");
        }
    }, [user]);

    const profileImageUpdate = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file); 

            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.onerror = () => {
                toast.error("Error reading file"); 
            };
            reader.readAsDataURL(file);
        }
    };

    const profileUpdateSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('email', email);
        if (avatar) {
            myForm.append('avatar', avatar); 
        }

        dispatch(updateProfile(myForm));
    };

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-center", autoClose: 3000 });
            dispatch(removeError());
        }
    }, [dispatch, error]);

    useEffect(() => {
        if (success) {
            toast.success(message, { position: "top-center", autoClose: 3000 });
            dispatch(removeSuccess());

            setTimeout(() => {
                navigate('/user/profile'); 
            }, 3000);
        }
    }, [dispatch, success, message, navigate]);

    if (loading) {
        return (
            <>
                <NavBar />
                <Loader />
                <Footer />
            </>
        );
    }

    return (
        <>
            <PageTitle title="Profile Update" />
            <NavBar />

            <div className="update-container">
                <div className="form-content">
                    <form
                        className="form"
                        encType="multipart/form-data"
                        onSubmit={profileUpdateSubmit}
                    >
                        <h2>Update Profile</h2>

                        <div className="input-group avatar-group">
                            <input
                                type="file"
                                className="input-file"
                                accept="image/*"
                                onChange={profileImageUpdate}
                            />
                            <img
                                src={avatarPreview}
                                alt={`${name}'s avatar`} 
                                className="avatar"
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}

                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                            />
                        </div>

                        <button className="authBtn" type="submit">Update</button>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default UpdateProfile;
