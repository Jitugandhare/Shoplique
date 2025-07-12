import React, { useEffect, useState } from 'react'
import PageTitle from "../components/PageTitle";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import '../UserStyles/Form.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeError, removeSuccess, resetPassword } from '../features/user/userSlice';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { token } = useParams();
    const { loading, error, success } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("password", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword({ token: token, userData: myForm }))

    }


    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-center", autoClose: 3000 });
            dispatch(removeError());
        }
    }, [dispatch, error]);

    useEffect(() => {
        if (success) {
            toast.success("Password Reset Successfully.Please Login To Continue...", { position: "top-center", autoClose: 3000 });
            dispatch(removeSuccess());
            navigate('/login');



        }
    }, [dispatch, success, navigate]);

    if (loading) {
        return <Loader />
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