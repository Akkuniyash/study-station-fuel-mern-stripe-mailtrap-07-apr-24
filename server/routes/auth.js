const express=require('express')
const multer=require('multer')
const path=require('path')
const upload=multer({storage:multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,path.join(__dirname,'..','uploads/user'))
    },
    filename:function(req,file,cb)
    {
        cb(null,file.originalname)
    }
})})
const router=express.Router()
const {registerUser,
    loginUser,
     logoutUser,
     forgotPassword,
     resetPassword,
     getUserProfile,
     changePassword,
     updateProfile,
    getAllUsers,
    getSpecificUser,
    updateUser,
    deleteUser
    }=require("../controllers/authControllers")
const {isAuthenticatedUser,authorizeRole}=require("../middlewares/authenticate")
router.route('/register').post(upload.single('avatar'),registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/reset').post(forgotPassword)
router.route('/password/reset/:token').post(resetPassword)
router.route('/myProfile').get(isAuthenticatedUser,getUserProfile)
router.route('/password/change').put(isAuthenticatedUser,changePassword)
router.route('/update').put(isAuthenticatedUser,upload.single('avatar'),updateProfile)

// Admin
router.route('/admin/users').get(isAuthenticatedUser,authorizeRole('admin'),getAllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRole('admin'),getSpecificUser)
router.route('/admin/user/:id').put(isAuthenticatedUser,authorizeRole('admin'),updateUser)
router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizeRole('admin'),deleteUser)

module.exports=router;