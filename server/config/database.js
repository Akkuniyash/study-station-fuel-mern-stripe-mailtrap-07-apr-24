const mongoose=require('mongoose')
exports.connectDatabase=()=>{
    mongoose.connect(process.env.DB_CONNECT_URI).then(con=>{
        console.log(`Database connected succcessfully:${con.connection.host}`);
    })
}
