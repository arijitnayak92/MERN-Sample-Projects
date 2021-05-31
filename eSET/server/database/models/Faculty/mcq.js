const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

const mcq = new Schema({

  question: { type: String, unique: false, required: false },
  option1: { type: String, unique: false, required: false },
  option2: { type: String, unique: false, required: false },
  option3: { type: String, unique: false, required: false },
  option4: { type: String, unique: false, required: false },
  answer: { type: String, unique: false, required: false },
})

var Mcq = mongoose.model('Mcq', mcq);

module.exports = Mcq
