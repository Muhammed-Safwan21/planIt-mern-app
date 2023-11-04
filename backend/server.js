const express = require('express');
const app = express();
const cors = require('cors');
const todoToRoutes = require('./routes/todoRoutes')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const path =require("path");


const cron = require("node-cron");
const {setReminder} = require('./utils/reminder');

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

dotenv.config()
connectDB()

app.use('/api',todoToRoutes)

cron.schedule("* * * * * ",setReminder)

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, '/frontend/build')));

app.get('*', (req, res) =>
  res.sendFile(path.resolve(_dirname, 'frontend', 'build', 'index.html')))

app.listen(process.env.PORT || 5000 , ()=>{
    console.log(`server running on ${process.env.PORT || 5000} port`)
})