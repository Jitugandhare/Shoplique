import React from 'react'
import '../UserStyles/Profile.css'
import PageTitle from "../components/PageTitle";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';



const Profile = () => {
    return (
        <>
            <PageTitle title="Profile Page" />
            <NavBar />
            <div className="profile-container">
                <div className="profile-image">
                    <h1 className="profile-heading">My Profile</h1>
                <img src="" alt="User Profile"  className='profile-image'/>
                <Link to="/user/profile/update">Edit Profile</Link>
                </div>
<div className="profile-details">
    <div className="profile-detail">
        <h2>Name:</h2>
        <p>jitu</p>
    </div>
       <div className="profile-detail">
        <h2>Email:</h2>
        <p>27jitug@gmail.com</p>
    </div>
       <div className="profile-detail">
        <h2>Joined On:</h2>
        <p>June 10</p>
    </div>
</div>

            </div>



            <Footer />
        </>
    )
}

export default Profile