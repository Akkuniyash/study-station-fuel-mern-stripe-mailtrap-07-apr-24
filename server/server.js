const app=require('./app')
// Includes tha app module
const path=require('path')
// provides utilities for working with file and directory paths.

/*
configures the 'dotenv' module to load environment variables from a specific file. It uses the path.join method to construct an absolute path to the 'config/config.env' file relative to the current working directory (__dirname represents the directory name of the current module). 
*/
const { connectDatabase } = require('./config/database')
connectDatabase();

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server Running Successfully in ${process.env.PORT} it is in the ${process.env.NODE_ENV} stage`);
})
// starts the server 
 
process.on('unhandledRejection',(err)=>{
    console.log(`Error :${err.message}`)
    console.log(`Shutting Down Due To Unhandled Rejections`)
    server.close(()=>{
        process.exit(1)
    })
})
process.on('uncaughtException',(err)=>{
    console.log(`Error :${err.message}`)
    console.log(`Shutting Down Due To UnCaught Exceptions`)
    server.close(()=>{
        process.exit(1)
    })
})
