const Order=require("../models/orderModel")
const catchAsyncError=require("../middlewares/catchAsyncError")
const ErrorHandler=require('../utils/errorHandler')
const Food=require('../models/foodModel')

exports.newOrder=catchAsyncError(async (req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        orderStatus
    } = req.body;
    const order=await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        orderStatus,
        paidAt: Date.now(),
        user: req.user.id
    })
    
    res.status(200).json({
        success:true,
        order
    })
})

exports.getSingleOrder=catchAsyncError(
    async (req,res,next)=>{
        const order=await Order.findById(req.params.id).populate('user','name email');
        if(!order)
        {
            return next(new ErrorHandler(`Order Not Found With This ${req.params.id}`,400))
        }
        res.status(200).json({
            success:true,
            order
        })
 }
)

exports.myOrders=catchAsyncError(
    async (req,res,next)=>{
        const order=await Order.find({user:req.user.id});
        res.status(200).json(
            {
                success:true,
                order
            }
        )
    }
)

// Admin

exports.getAllOrders=catchAsyncError(
    async (req,res,next)=>{
        const orders=await Order.find();
        let totalAmount=0;
        orders.forEach(
            order=>{
                totalAmount+=order.totalPrice
            }
        )
        res.status(200).json(
            {
                success:true,
                totalAmount,
                orders

            }
        )
    }
)

exports.updateOrder=catchAsyncError(
    async(req,res,next)=>{
        const order=await Order.findById(req.params.id)
        if(order.orderStatus==='Served')
        {
            return next(new ErrorHandler("Food Already Served",400))
        }
       
        order.orderStatus=req.body.orderStatus;
        order.deliveredAt=Date.now()
        await order.save()
        res.status(200).json(
            {
                success:true
            }
        )
    }
)
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
    }

    await order.deleteOne();
    res.status(200).json({
        success: true
    })
})

