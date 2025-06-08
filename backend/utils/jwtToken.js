
 const sendToken = (user, statuscode, res) => {
    const token = user.getJwtToken();


    // cookies options

    const options = {
        expires: new Date(Date.now() + process.env.COOKIES_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }
    res.status(statuscode).cookie("token", token, options).json({
        success: true,
        user,
        token: token
    })
}

module.exports=sendToken;