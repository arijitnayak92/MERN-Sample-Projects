const passport = require('passport')
const LocalStrategy = require('./FacLocalStrategy')
const User = require('../database/models/Faculty/user')

passport.serializeUser((user, done) => {
	done(null, { _id: user._id,count: user.count })
})


passport.deserializeUser((id, done) => {
	User.findOne(
		{ _id: id },
		['username','desgn','campus','college','school','dept','name','h_order'],
		(err, user) => {
			if(err)
			{
				done(err,false)
			}
			else{
			done(null, user)
			}
		}
	)
})

passport.use(LocalStrategy)

module.exports = passport
