const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const crypto=require('crypto');
const userInfo=require('../data/userInfo.json')

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please Enter Name"]
        },
        email:{
            type:String,
            required:[true,"Please enter Email"],
            unique:true,
            validate:[validator.isEmail,"Provided Email Is Not A Email Format"]
        },
        password:{
            type:String,
            required:[true,"Please enter Password"],
            minLength:[5,"Password Is Too Short"],
            validate:[validator.isStrongPassword,"Password is weak"],
            select:false
        },
        avatar:{
            type:String,
        },
        userId:{
            type:Number,
            required:[true,"Please Enter Register Or Staff Id To Register"],
            unique:true,
        },
        year:{
            type:Number,
            required:[true,"Please Enter Year Of Study"]
        },

        role:{
            type:String,
            default:"user"
        },
        department: {
            type: String,
            
            enum: {
              values: [
        "BCA",
        "BBA",
        "BCOM",
        "BIO TECH",
        "ISM",
        "BSC CS",
              ],
              message: "Please Select Correct Department",
            },
            required: [true, "Please enter Department Name"],
          },

        resetPasswordToken:{
            type:String
        },
        resetPasswordTokenExpire:Date,
        createdAt:{
            type:Date,
            default:Date.now()
        }
    }
)

userSchema.pre('save',async function (next){
    if(!this.isModified('password'))
    {
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.getJwtToken=function ()
{
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

userSchema.methods.isValidPassword=async function(enteredPassword)
{
    return  bcrypt.compare(enteredPassword,this.password)
}
userSchema.methods.getResetToken=async function()
{
    // Generate Token By Using Crypto
const token=crypto.randomBytes(20).toString('hex');
    // Generate And Set resetPasswordToken by hash
this.resetPasswordToken = crypto.createHash('sha256').update(token).digest("hex");;   
this.resetPasswordTokenExpire=Date.now()+30*60*1000;
return token;


}


const userModel=mongoose.model('User',userSchema)
module.exports=userModel