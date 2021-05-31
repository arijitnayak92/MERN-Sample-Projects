const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise


const userSchema = new Schema({
title: { type: String, unique: false, required: false },
name: { type: String, unique: false, required: false },
username: { type: String, unique: false, required: false },
mailid: { type: String, unique: false, required: false },
phone: { type: String, unique: false, required: false },
campus: { type: String, unique: false, required: false },
dept: { type: String, unique: false, required: false },
desgn: { type: String, unique: false, required: false },
h_order: { type: Number, unique: false, required: false },
password: { type: String, unique: false, required: false },
inserted_by: { type: String, unique: false, required: false },
cnf_pswd: { type: String, unique: false, required: false },
college: { type: String, unique: false, required: false },
school: { type: String, unique: false, required: false },
department_name: { type: String, unique: false, required: false },
action_type: { type: String, unique: false, required: false },
deptToken: { type: String, unique: false, required: false },
suspension_status: { type: Boolean, unique: false, required: false },
active: { type: Boolean, unique: false, required: false },
created:{type: Date, default: Date.now},
})


userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}



userSchema.pre('save', function (next) {
	if (!this.password) {
		next()
	} else {
		this.password = this.hashPassword(this.password)
		next()
	}
})



const Fac_User = mongoose.model('Fac_User', userSchema)
module.exports = Fac_User
