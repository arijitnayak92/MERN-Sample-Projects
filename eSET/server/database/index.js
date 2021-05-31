const mongoose = require('mongoose')
mongoose.Promise = global.Promise
var autoIncrement = require('mongoose-auto-increment');
const uri = 'mongodb://localhost:27017/eTest'

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
  var connection = mongoose.createConnection("mongodb://localhost:27017/eTest",{ useNewUrlParser: true,useUnifiedTopology: true});

  autoIncrement.initialize(connection);

module.exports = mongoose.connection
