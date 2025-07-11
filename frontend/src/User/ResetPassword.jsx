import React, { useState } from 'react'
import PageTitle from "../components/PageTitle";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import '../UserStyles/Form.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("newPassword", newPassword)
        myForm.set("confirmPassword", confirmPassword);

    }
    return (
        <>
            <PageTitle title="Reset Password" />
            <NavBar />
            <div className="form-container">
                <div className="form-content">
                    <form className="form" onSubmit={resetPasswordSubmit}>
                        <h2>Update Password</h2>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Enter New Password"
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button className="authBtn" type="submit" >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ResetPassword