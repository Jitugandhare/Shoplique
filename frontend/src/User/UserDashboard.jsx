import React, { useState } from 'react'
import '../UserStyles/UserDashboard.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout, removeError, removeSuccess } from '../features/user/userSlice'
import { toast } from "react-toastify";

const UserDashboard = ({ user }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible)
    }


    const navigate = useNavigate();

    const dispatch = useDispatch();

    const options = [
        { name: "Orders", funcName: orders },
        { name: "Account", funcName: account },
        { name: "Logout", funcName: logoutFun },
    ]
    if (user.role === 'admin') {
        options.unshift({
            name: "Admin Dashboard", funcName: dashboard
        })
    }

    function orders() {
        navigate('/order/my-orders')
    }

    function account() {
        navigate('/user/profile')
    }


    function logoutFun() {
        dispatch(logout())
            .unwrap()
            .then(() => {
                toast.success("Logout Successfully", { position: "top-center", autoClose: 2000 })
                dispatch(removeSuccess());
                navigate("/login")
            }).catch((error) => {
                toast.error(error?.message || "Logout Failed", { position: "top-center", autoClose: 3000 });
                dispatch(removeError())
            })
    }

    function dashboard() {
        navigate('/admin/dashboard')

    }
    return (
        <>
            <div className={`overlay ${menuVisible ? "show" : ""}`} onClick={toggleMenu}> </div>
            <div className='dashboard-container'>
                <div className="profile-header" onClick={toggleMenu}>
                    <img src={user.avatar.url ? user.avatar.url : "./Profile/Profile.png"} alt="Profile Picture" className='profile-avatar' />
                    <span className="profile-name">{user.name || "User"}</span>
                </div>
                {menuVisible && (<div className="menu-options">
                    {options.map((item) => (
                        <button className="menu-option-btn" onClick={item.funcName} key={item.name}>{item.name}</button>
                    ))}

                </div>)}
            </div>

        </>
    )
}

export default UserDashboard