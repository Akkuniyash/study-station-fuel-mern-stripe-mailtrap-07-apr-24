const express=require('express')
// It includes the Express JS Web Library 
const app=express();
const path=require('path')
const cookieParser=require('cookie-parser');
const dotenv=require('dotenv')

//  used to load environment variables from a .env file into the Node.js process.env object.
dotenv.config({path:path.join(__dirname,'./config/config.env')})
// By Calling the express() we can get a instance by doing this we can able to define routes 
// middleware and other setting
const foods=require('./routes/food') 
const payment=require('./routes/payment')  
const user=require('./routes/auth')
const order=require('./routes/order')
const errorMiddleware=require('./middlewares/error')



app.use(express.json());
app.use(cookieParser())
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/api/v1/',foods)
app.use('/api/v1/',user)
app.use('/api/v1/',order)
app.use('/api/v1/',payment)
if(process.env.NODE_ENV==='production')
{
app.use(  express.static(path.join(__dirname,'../client/build')))
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'../client/build/index.html'))
})
}
app.use(errorMiddleware)
module.exports=app;
// we can able to include this defined module in other files


