var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/qanda_test';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//Require Mongoose
var mongoose = require('mongoose');



//Define schemas
var Schema = mongoose.Schema;

var photoSchema = new Schema({
  id: {type: Number, unique: true},
  answer_id: Number,
  url: String
})

var answerSchema = new Schema({
  id: {type: Number, unique: true},
  question_id: Number,
  body: String, 
  date_written: String,
  answerer_name: String,
  answerer_email: String,
  reported: {default: 0},
  helpful: {default: 0},
  photos: [photoSchema]
});

var questionSchema = new Schema({
  id: {type: Number, unique: true},
  product_id: Number,
  body: String,
  date_written: String,
  asker_name: String,
  asker_email: String,
  reported: {default: 0},
  helpful: {default: 0},
  answers: [answerSchema]
})

var Questions = mongoose.model('questionModel', questionSchema, 'questions')
var Answers = mongoose.model('answerModel', answerSchema, 'testanswers');
var Photos = mongoose.model('photoModel', photoSchema, 'photos')

console.log('Schemas Created....')


// load data defining columns