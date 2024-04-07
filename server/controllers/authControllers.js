const catchAsyncError=require("../middlewares/catchAsyncError")
const User=require('../models/userModel')
const sendEmail = require("../utils/email")
const ErrorHandler=require("../utils/errorHandler")
const { sendToken } = require("../utils/jwt")
const crypto=require('crypto');
const userInfo=require('../data/userInfo.json')
const isValidUser = function (enteredId, name, department, year) {
    const data = userInfo;
    name = name.toLowerCase();
    for (const entry of data) {
        if (entry.RegisterId == enteredId && entry.Name == name && entry.Department == department && entry.Year == year) {
            return true;
        }
        if (entry.StaffId == enteredId && entry.Name == name && entry.Department == department) {
            return true;
        }
    }
    return false;
}
exports.registerUser=catchAsyncError(async (req,res,next)=>{
    const{name,email,password,department,userId,year}=req.body;
    if(!isValidUser(userId,name,department,year))
    {
        return next(new ErrorHandler("Not A Valid User",401))
    }
    let avatar;
    let BASE_URL=process.env.SERVER_URL;
    if(process.env.NODE_ENV==='production')
    {
        BASE_URL=`${req.protocol}://${req.get('host')}`
    }
    if(req.file)
    {
        avatar=`${BASE_URL}/uploads/user/${req.file.originalname}`
    }
    const user=await User.create(
        {
            name,
            email,
            password,
            avatar,
            department,
            userId,
            year
            
           
        }
    )
    sendToken(user,201,res);
})

exports.loginUser=catchAsyncError(async (req,res,next)=>{
    const {email,password}=req.body
    if(!email || !password)
    {
        return next(new ErrorHandler("Please Enter Password And Email",400))
    }
    const user=await User.findOne({email}).select('+password')
    
    if(!user)
    {
        return next(new ErrorHandler(" Invalid Password And Email",401))

    }
    if(!await user.isValidPassword(password))
    {
        return next(new ErrorHandler(" Invalid Password And Email",401))
    }
    sendToken(user,201,res)
})

exports.logoutUser=(req,res,next)=>{
    res.cookie('token',null,{
        expiresIn:new Date(Date.now()),
        httpOnly:true
    }).status(200).json({
        success:true,
        message:"Logged Out"
    })
  
}

exports.forgotPassword=catchAsyncError(async (req,res,next)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user)
    {
        return next(new ErrorHandler("Sorry User Not Found For This Email",404))
    }
    const resetToken=await user.getResetToken();
    await user.save({validateBeforSave:false})
    let BASE_URL = process.env.CLIENT_URL;
    if (process.env.NODE_ENV === "production") {
      BASE_URL = `${req.protocol}://${req.get('host')}`;
    }
    const resetUrl=`${BASE_URL}/password/reset/${resetToken}`
    const message=`Your Password Reset Link Is As Follows \n\n
    ${resetUrl}\n\n
    Please Ignore If This Is Not Done By You!!`
    try
    {
        await sendEmail(

            {
                email:user.email,
                message:message,
                subject:'StudyStation Fuel Password Recovery'

            }
        )
        res.status(201).json({
            success:true,
            message:"Email Sent Successfully"
        })
    }
    catch(err)
    {
        user.resetPasswordToken=undefined;
        user.resetPasswordTokenExpire=undefined;
        await user.save({validateBeforSave:false})
        return next(new ErrorHandler("Something Went Wrong",500))
    }

})

exports.resetPassword=catchAsyncError(async (req,res,next)=>{
    const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire:{
            $gt:Date.now()
        }
    })
    if(!user)
    {
        return next(new ErrorHandler("Password Reset Failed or Expired",400))
    }
    if(req.body.password!==req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password Mismatch",400))
    }
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordTokenExpire=undefined;
    await user.save({validateBeforeSave:false})
    sendToken(user,200,res)

})
exports.getUserProfile=catchAsyncError(async (req,res,next)=>{
    const user=await User.findById(req.user.id);
    res.status(200).json(
        {
            success:true,
            user
        }
    )
})
exports.changePassword=catchAsyncError(async (req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password")
    if(!await user.isValidPassword(req.body.oldPassword))
    {
        return next(new ErrorHandler("Old Passwoerd Is Incorrect",401))
    }
    user.password=req.body.password;
    await user.save();
    res.status(200).json({
        success:true,
        message:"Password Changed Successfully"
    })

})
exports.updateProfile=catchAsyncError(async (req,res,next)=>{
    let newData={
        email:req.body.email
    }
    let BASE_URL=process.env.SERVER_URL;
    if(process.env.NODE_ENV==='production')
    {
        BASE_URL=`${req.protocol}://${req.get('host')}`
    }
    let avatar;
    if(req.file)
    {
        avatar=`${BASE_URL}/uploads/user/${req.file.originalname}`
        newData={...newData,avatar}
    }
    const user=await User.findByIdAndUpdate(req.user.id,newData,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        user
    })
})

// Admin

exports.getAllUsers=catchAsyncError(async (req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        success:true,
        users
    })
})

exports.getSpecificUser=catchAsyncError(async (req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user)
    {
        return next(new ErrorHandler(`User Not Found With This Id ${req.params.id}`,400))
    }
    res.status(200).json({
        success:true,
        user
    })
})

exports.updateUser=catchAsyncError(async (req,res,next)=>{
    const newData={
        email:req.body.email,
        role:req.body.role
    }

    const user=await User.findByIdAndUpdate(req.params.id,newData,{
        runValidators:true,
        new:true
    })

    res.status(200).json({
        success:true,
        user
    })
})

exports.deleteUser=catchAsyncError(async (req,res,next)=>{
    const user=await User.findById(req.params.id)
    if(!user)
    {
        return next(new ErrorHandler("User Not Found",400))
    }
    await User.deleteOne(user)
    res.status(200).json({
        success:true,
        message:"User Deleted"
    })
})