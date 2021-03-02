const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise


const userSchema = new Schema({
password: { type: String, unique: true, required: true },
name: { type: String, unique: false, required: true },
username: { type: String, unique: false, required: true },
mailid: { type: String, unique: false, required: true },
refreshToken: { type: String, unique: false, required: false },
phone: { type: String, unique: false, required: true },
createdAt:{type: Date, default: Date.now},
})

const User = mongoose.model('user', userSchema)
module.exports = User
