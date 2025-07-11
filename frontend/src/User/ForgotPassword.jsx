import React, { useState } from 'react'
import PageTitle from "../components/PageTitle";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import '../UserStyles/Form.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState("")

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("email", email)
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