const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"todo title field is required"]
    },
      dateTime:{
        type:Date,
        required:[true,"date and time is required"]
      },
      description:{
        type:String
      },
      status:{
        type:String ,
        required:[true,'status is required']
      }
})

module.exports = mongoose.model('todos',todoSchema)