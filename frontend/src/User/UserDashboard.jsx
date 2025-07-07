import React from 'react'


const UserDashboard = ({ user }) => {

    return (
        <div>
            <img src={user.avatar.url ? user.avatar.url : "./Profile/Profile.png"} alt={user.name} />
        </div>
    )
}

export default UserDashboard