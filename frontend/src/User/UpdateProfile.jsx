import React, { useEffect, useState } from 'react'
import "../UserStyles/Form.css"
import PageTitle from "../components/PageTitle";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";


const UpdateProfile = () => {
    const { loading, isAuthenticated, user } = useSelector(state => state.user)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState("./Profile/Profile.png")


    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar?.url || "./Profile/Profile.png");
        }
    }, [user]);

    const profileImageUpdate = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.onerror = (error) => {
                toast.error("Error reading file")
            }

            reader.readAsDataURL(e.target.files[0])
        }
    }




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
            <PageTitle title="Profile Update " />
            <NavBar />

            <div className="update-container">
                <div className="form-content">
                    <form className="form" encType='multipart/form-data'>
                        <h2>Update Profile</h2>
                        <div className="input-group avatar-group">
                            <input type="file" className="input-file " accept='image/' onChange={profileImageUpdate} />
                            <img src={avatarPreview} alt="Profile Picture" className='avatar' />
                        </div>

                        <div className="input-group">
                            <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <button className="authBtn" type='submit'>Update</button>
                    </form>
                </div>
            </div>



            <Footer />
        </>
    )
}

export default UpdateProfile;