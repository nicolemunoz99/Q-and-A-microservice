var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/qanda';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var mongoose = require('mongoose');



//Define schemas
var Schema = mongoose.Schema;

var dataSchema = new Schema({
  _id: Number,
  questions: []
});

var questionSchema = new Schema({
  id: Number,
  product_id: Number,
  body: String,
  date_written: String,
  asker_name: String,
  asker_email: String,
  reported: Number,
  helpful: Number,
  answers: []
})



var Data = mongoose.model('dataModel', dataSchema, 'questions_aggr');


module.exports = Data;