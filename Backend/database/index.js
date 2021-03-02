const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const uri = 'mongodb://localhost:27017/testDB'

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    }).then(
    () =>
    {
      console.log('Connected to Mongo...');
    },
    err =>
    {
     console.log('Error Connecting to Mongo !!'+err)
    }
  );
  var connection = mongoose.createConnection(uri,{ useNewUrlParser: true,useUnifiedTopology: true});


module.exports = mongoose.connection
