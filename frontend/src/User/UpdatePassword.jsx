import React, { useState } from 'react'
import '../UserStyles/Form.css';
import PageTitle from "../components/PageTitle";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, } from 'react-redux';

const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword)
        myForm.set("newPassword", newPassword)
        myForm.set("confirmPassword", confirmPassword)

        for(let pair of myForm.entries()){
            console.log(pair[0]+"-"+pair[1])
        }
    }



    return (
        <>
            <PageTitle title="Password Update" />
            <NavBar />
            <div className="form-container">
                <div className="form-content">
                    <form className="form" onSubmit={handlePasswordSubmit}>
                        <h2>Update Password</h2>
                        <div className="input-group">
                            <input type="password" placeholder="Old Password" name="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                        </div><div className="input-group">
                            <input type="password" placeholder="New Password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div><div className="input-group">
                            <input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <button className="authBtn" type='submit'>Update Passw</button>
                    </form>
                </div>
            </div>



            <Footer />
        </>
    )
}

export default UpdatePassword