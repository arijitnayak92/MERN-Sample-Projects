const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise
var autoIncrement = require('mongoose-auto-increment');

const different_res = new Schema({
  subject: {type: String , unique: false, required: false},
  level: {type: String , unique: false, required: false},
  username: {type: String , unique: false, required: false},
  question: {type: String , unique: false, required: false},
  skill_name: {type: String , unique: false, required: false},
  course_id: {type: String , unique: false, required: false},
  no_of_option: {type: Number , unique: false, required: false},
  rowA: {type: Number , unique: false, required: false},
  rowB: {type: Number , unique: false, required: false},
  mark: {type: Number , unique: false, required: false},
  time_limit_in_min: {type: Number , unique: false, required: false},
  set_timelimit: {type: Boolean , unique: false, required: false},
  question_type: {type: String , unique: false, required: false},
  answer:{ type: String, unique: false, required: false },
  options:{type:Array},
  optionBs:{type:Array},
  answers:{type:Array},
  created:{type: Date, default: Date.now},
})



different_res.plugin(autoIncrement.plugin, { model: 'Questions', field: 'serial', startAt: 1,incrementBy: 1 });

const Questions = mongoose.model('Questions', different_res)
module.exports = Questions
