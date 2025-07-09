import React, { useEffect, useState } from 'react';
import '../UserStyles/Form.css';
import PageTitle from "../components/PageTitle";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, removeSuccess, updatePassword } from '../features/user/userSlice';
import { toast } from 'react-toastify';

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { loading, error, success } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error("Please fill in all fields", { position: "top-center", autoClose: 3000 });
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match", { position: "top-center", autoClose: 3000 });
            return;
        }

        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    };

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-center", autoClose: 3000 });
            dispatch(removeError());
        }
    }, [dispatch, error]);

    useEffect(() => {
        if (success) {
            toast.success("Password Updated Successfully", { position: "top-center", autoClose: 3000 });


            dispatch(removeSuccess());
            navigate('/user/profile');

        }
    }, [dispatch, success, navigate]);

    return (
        <>
            <PageTitle title="Password Update" />
            <NavBar />
            <div className="form-container">
                <div className="form-content">
                    <form className="form" onSubmit={handlePasswordSubmit}>
                        <h2>Update Password</h2>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Old Password"
                                name="oldPassword"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="New Password"
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
                        <button className="authBtn" type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UpdatePassword;
