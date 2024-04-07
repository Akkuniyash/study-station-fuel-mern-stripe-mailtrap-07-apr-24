const ErrorHandler=require('../utils/errorHandler')
const catchAsyncError=require('./catchAsyncError')
const jwt=require('jsonwebtoken')
const User=require('../models/userModel')
exports.isAuthenticatedUser=catchAsyncError(async (req,res,next)=>{
    const {token}=req.cookies;
    if(!token)
    {
        return next(new ErrorHandler('Login First To Handle The Resource',400))
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    
    req.user=await User.findById(decoded.id)
   
    next()
})

exports.authorizeRole=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role))
        {
            return next(new ErrorHandler(`Role ${req.user.role} is not authorized`,401))
        }
        next();
    }
  
}