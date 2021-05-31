const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const mongoose = require('mongoose')
const dbConnection = require('./database')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport/fac_pass');

const app = express()
const PORT = 8080
// Route requires
const user = require('./routes/user')

// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: true
	})
)
app.use(bodyParser.json())

// Sessions
app.use(
	session({
		secret: 'fraggle-rock',
		store: new MongoStore({ mongooseConnection: dbConnection}),
		resave: false,
		saveUninitialized: false,
		maxAge: Date.now() + (86400020)
	})
)




// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Routes
app.use('/etest/user', user)






// Starting Server
const serve = app.listen(PORT);

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http serve.');
  serve.close(() => {
    console.log('Http server closed.');
    // boolean means [force], see in mongoose doc
    mongoose.connection.close(false, () => {
      console.log('MongoDb connection closed.');
      process.exit(0);
    });
  });
});
