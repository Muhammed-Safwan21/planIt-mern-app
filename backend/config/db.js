const mongoose = require('mongoose')

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
        console.log(`DB connected with ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`DB connection error : ${error.message}`)
    }
}
module.exports = connectDB ;

