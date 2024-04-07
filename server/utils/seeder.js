const foods=require('../data/food.json')
const Food=require('../models/foodModel')
const {connectDatabase} =require('../config/database')
const dotenv=require('dotenv')
const path=require('path')

dotenv.config({path:'server/config/config.env'})

connectDatabase()


const seedFoods=async()=>{
    try{
        await Food.deleteMany();
    console.log("Food Items Deleted")
    await Food.insertMany(foods)
    console.log("Food Items Added")
    }
    catch(err)
    {
        console.log(err)
    }
    process.exit();
}
seedFoods()