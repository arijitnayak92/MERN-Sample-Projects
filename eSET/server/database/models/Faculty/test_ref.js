const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise
var autoIncrement = require('mongoose-auto-increment');

const different_res = new Schema({
  action: {type: String , unique: false, required: false},
  type: {type: String , unique: false, required: false},
  test_type: {type: String , unique: false, required: false},
  layout: {type: String , unique: false, required: false},
  username: {type: String , unique: false, required: false},
  name:{ type: String, unique: false, required: false },
  campus:{ type: String, unique: false, required: false },
  year:{ type: String, unique: false, required: false },
  dept:{ type: String, unique: false, required: false },
  batch:{ type: String, unique: false, required: false },
  sem:{ type: String, unique: false, required: false },
  test_ref:{ type: Number, unique: false, required: false },
  exam_id:{ type: Number, unique: false, required: false },
  students: {type: Array},
  exam_details: {type: Array},
  questions: {type: Array},
  created:{type: Date, default: Date.now},
})



different_res.plugin(autoIncrement.plugin, { model: 'TestRef', field: 'serial', startAt: 1,incrementBy: 1 });

const TestRef = mongoose.model('TestRef', different_res)
module.exports = TestRef
