const mongoose = require('mongoose')
const Shema = mongoose.Schema

const recordSchema = new mongoose.Schema({
  "name":{
    type: String,
    required: true
  },
  "category":{
    type: String,
    required: true
  },
  "date":{
    type: String,
    required: true
  },
  "amount":{
    type: String,
    required: true
  },
  "userId":{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)
