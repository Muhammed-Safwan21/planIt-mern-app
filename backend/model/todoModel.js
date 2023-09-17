const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"this field is required"]
    },
    date: {
        type: String,
        required: [true, "Date is required"]
      },
      time:{
        type: String,
        required: [true, "time is required"]
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