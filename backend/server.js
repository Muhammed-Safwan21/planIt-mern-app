const express = require('express');
const app = express();
const cors = require('cors');
const todoToRoutes = require('./routes/todoRoutes')
const connectDB = require('./config/db')
const dotenv = require('dotenv')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

dotenv.config()
connectDB()

app.use('/api',todoToRoutes)


app.listen(process.env.PORT || 5000 , ()=>{
    console.log(`server running on ${process.env.PORT || 5000} port`)
})