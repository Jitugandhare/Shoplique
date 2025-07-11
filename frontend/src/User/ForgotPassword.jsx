import React, { useEffect, useState } from 'react'
import PageTitle from "../components/PageTitle";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import '../UserStyles/Form.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword, removeError, removeSuccess } from '../features/user/userSlice';

const ForgotPassword = () => {
    const [email, setEmail] = useState("")

    const { loading, error, success, message } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            return toast.error("Please enter your email", { position: "top-center", autoClose: 3000 });
        }
        const myForm = new FormData();
        myForm.set("email", email)
        dispatch(forgotPassword(myForm))
    }


    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-center", autoClose: 3000 })
            setEmail("")
            dispatch(removeError())
        }
    }, [dispatch, error]);

    useEffect(() => {
        if (success) {
            toast.success(message, { position: "top-center", autoClose: 3000 })
            setEmail("");
            dispatch(removeSuccess());
        }

    }, [dispatch, success])


    if (loading) {
        return <Loader />
    }


    return (
        <>

            <PageTitle title="Reset Password" />
            <NavBar />
            <div className="forgot-container">
                <div className="form-content email-group">
                    <form className="form" onSubmit={forgotPasswordSubmit}>
                        <h2>Forgot Password</h2>
                        <div className="input-group">
                            <input type="email"
                                placeholder='Enter Your Register Email'
                                value={email}
                                name='email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button className="authBtn">Send</button>
                    </form>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default ForgotPassword