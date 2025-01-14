const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema(
    {
        shippingInfo:{
            address:{
                type:String,
                required:true
            },
            country:{
                type:String,
                required:true
            },
            city:{
                type:String,
                required:true
            },
            phoneNo:{
                type:String,
                required:true
            },
            postalCode:{
                type:String,
                required:true
            },

        },
        user:{
            type:mongoose.SchemaTypes.ObjectId,
            required:true,
            ref:'User'
        },
        orderItems:[
            {
                name:{
                    type:String,
                    required:true
                },
                quantity:{
                    type:Number,
                    required:true
                },
                image:{
                    type:String,
                    required:true
                },
                price:{
                    type:Number,
                    required:true
                },
                food:{
                    type:mongoose.SchemaTypes.ObjectId,
                    required:true,
                    ref:'Food'
                    
                }
            }
        ],
        itemPrice:{
            type:Number,
            required: true,
            default:0
        },
        taxPrice:{
            type:Number,
            required: true,
            default:0
        },
        shippingPrice:{
            type:Number,
            required: true,
            default:0
        },
        totalPrice:{
            type:Number,
            required: true,
            default:0
        },
        paymentInfo:{
            id:{
                type:String,
                required:true
            },
            status:{
                type:String,
                required:true,
                
            }
        },
        paidAt:{
            type:Date,
            default:Date.now()
        },
        deliveredAt:{
            type:Date,
            default:Date.now()
        },
        orderStatus:{
            type:String,
            required:true,
            
        },
        createdAt:{
            type:Date,
            default:Date.now()
        },
        paymentInfo:{
            id:{
                type:String,
                required:true
            },
            status:{
                type:String,
                required:true
            }
        }
    }
)

let orderModel=mongoose.model('Order',orderSchema);
module.exports=orderModel;