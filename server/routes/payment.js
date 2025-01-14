const express=require('express')
const router=express.Router()
const {processPayment, sendStripeApi} =require('../controllers/paymentControllers')
const {isAuthenticatedUser}=require('../middlewares/authenticate')
router.route('/payment/process').post(isAuthenticatedUser,processPayment)
router.route('/stripeapi').get(isAuthenticatedUser,sendStripeApi)

module.exports=router;