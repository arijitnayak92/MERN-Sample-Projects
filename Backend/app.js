const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('./database')
const user = require('./routes/main')

const {
  SERVER_PORT
} = process.env;

const app = express()
const PORT = SERVER_PORT

app.use(cors());
app.use(bodyParser.json());

//middleware to handle CORS error !
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  app.use((error,req,res,next)=>{
    const status=error.statusCode||500;
    const message=error.message;
    res.status(status).json({err_message:message,status_code:status});
});


app.use('/user', user)

// Starting Server
const serve = app.listen(PORT,()=>{
  console.log('Server Started')
});

// Gracefully shutdown ...
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http serve.');
  serve.close(() => {
    console.log('Http server closed.');
    mongoose.connection.close(false, () => {
      console.log('MongoDb connection closed.');
      process.exit(0);
    });
  });
});
