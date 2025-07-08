import React, { useEffect } from 'react';
import '../UserStyles/Profile.css';
import PageTitle from "../components/PageTitle";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, } from 'react-redux';

const Profile = () => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    const navigate = useNavigate();


    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login')
        }
    }, [isAuthenticated])

    if (loading) {
        return (
            <>
                <NavBar />
                <Loader />
                <Footer />
            </>
        );
    }

    if (!user) {
        return (
            <>
                <NavBar />
                <div className="error">User not found.</div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <PageTitle title={`${user.name}'s Profile`} />
            <NavBar />
            <div className="profile-container">
                <div className="profile-image">
                    <h1 className="profile-heading">My Profile</h1>
                    <img src={user.avatar?.url || '/Profile/Profile.png'} alt="User Profile" className='profile-image' />
                    <Link to="/user/profile/update">Edit Profile</Link>
                </div>
                <div className="profile-details">
                    <div className="profile-detail">
                        <h2>Name:</h2>
                        <p>{user.name}</p>
                    </div>
                    <div className="profile-detail">
                        <h2>Email:</h2>
                        <p>{user.email}</p>
                    </div>
                    <div className="profile-detail">
                        <h2>Joined On:</h2>
                        <p>{user.createdAt ? new Date(user.createdAt).toISOString().substring(0, 10) : 'N/A'}</p>
                    </div>
                </div>
                <div className="profile-buttons">
                    <Link to="/order/my-orders">My Orders</Link>
                    <Link to="/user/password/update">Change Password</Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profile;
