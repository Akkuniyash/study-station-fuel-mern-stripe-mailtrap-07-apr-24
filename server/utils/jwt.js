exports.sendToken=(user,statusCode,res)=>{
    const token=user.getJwtToken();

    //setting cookie
    const options={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
        httpOnly:true
    }
    res.
    cookie('token',token,options).
    status(statusCode).json(
        {
            sucess:true,
            user,
            token
        }
    )
}