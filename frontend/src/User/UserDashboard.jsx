import React from 'react'
import '../UserStyles/UserDashboard.css'
import { useNavigate } from 'react-router-dom'

const UserDashboard = ({ user }) => {
    const navigate = useNavigate();

    const options = [
        { name: "Orders", funcName: orders },
        { name: "Account", funcName: account },
        { name: "Logout", funcName: logout },
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
    function logout() {
        console.log("logout success")

    }

    function dashboard() {
        navigate('/admin/dashboard')

    }
    return (
        <div className='dashboard-container'>
            <div className="profile-header">
                <img src={user.avatar.url ? user.avatar.url : "./Profile/Profile.png"} alt="Profile Picture" className='profile-avatar' />
                <span className="profile-name">{user.name || "User"}</span>
            </div>
            <div className="menu-options">
                {options.map((item) => (
                    <button className="menu-option-btn" onClick={item.funcName} key={item.name}>{item.name}</button>
                ))}

            </div>
        </div>
    )
}

export default UserDashboard