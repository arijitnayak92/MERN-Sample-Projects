const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise
var autoIncrement = require('mongoose-auto-increment');

const different_res = new Schema({
  skill_name: {type: String , unique: false, required: false},
  type: {type: String , unique: false, required: false},
  created:{type: Date, default: Date.now},
})



different_res.plugin(autoIncrement.plugin, { model: 'Skills', field: 'serial', startAt: 1,incrementBy: 1 });

const Skills = mongoose.model('Skills', different_res)
module.exports = Skills
