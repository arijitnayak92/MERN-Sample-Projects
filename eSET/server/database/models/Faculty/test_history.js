const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise
var autoIncrement = require('mongoose-auto-increment');

const different_res = new Schema({
  action: {type: String , unique: false, required: false},
  type: {type: String , unique: false, required: false},
  test_type: {type: String , unique: false, required: false},
  username: {type: String , unique: false, required: false},
  total_mark:{ type: Number, unique: false, required: false },
  description:{ type: String, unique: false, required: false },
  date_of_conduct:{ type: String, unique: false, required: false },
  no_of_questions:{ type: Number, unique: false, required: false },
  time_limit:{ type: Number, unique: false, required: false },
  verified:{ type: Boolean, unique: false, required: false },
  done:{ type: Boolean, unique: false, required: false },
  question_setup:{ type:Number, unique: false, required: false },
  layout:{ type: String, unique: false, required: false },
  created:{type: Date, default: Date.now},
  combination:{type:Array},
  questions:{type:Array},
})



different_res.plugin(autoIncrement.plugin, { model: 'TestHistory', field: 'serial', startAt: 1,incrementBy: 1 });

const TestHistory = mongoose.model('TestHistory', different_res)
module.exports = TestHistory
