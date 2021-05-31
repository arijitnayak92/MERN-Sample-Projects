const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise
var autoIncrement = require('mongoose-auto-increment');

const different_res = new Schema({
  action: {type: String , unique: false, required: false},
  username: {type: String , unique: false, required: false},
  link: {type: String , unique: false, required: false},
  usertype: {type: String , unique: false, required: false},
  val: {type: String , unique: false, required: false},
  designation_order_no: {type: String , unique: false, required: false},
  designation_name: {type: String , unique: false, required: false},
  department_name: {type: String , unique: false, required: false},
  school_name: {type: String , unique: false, required: false},
  college_name: {type: String , unique: false, required: false},
  campus: {type: String , unique: false, required: false},
  selected_campus:{type:Array},
  created:{type: Date, default: Date.now},
})



different_res.plugin(autoIncrement.plugin, { model: 'Super_Admin', field: 'serial', startAt: 1,incrementBy: 1 });

const Super_Admin = mongoose.model('Super_Admin', different_res)
module.exports = Super_Admin
