var mongoose = require('mongoose');
var mongoDB = 'mongodb://3.133.93.24:27017/qanda';
// var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.connect('mongodb://3.133.93.24:27017/qanda', { useNewUrlParser: true })


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var mongoose = require('mongoose');



//Define schemas
var Schema = mongoose.Schema;

var photoSchema = new Schema({
  id: Number,
  answer_id: Number,
  url: String
});
var answerSchema = new Schema({
  id: Number,
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
  id: Number,
  product_id: Number,
  body: String,
  date_written: String,
  asker_name: String,
  asker_email: String,
  reported: {type: Number, default: 0},
  helpful: {type: Number, default: 0},
  answers: [answerSchema]
});



var dataSchema = new Schema({
  _id: Number,
  results: [questionSchema]
});


var Data = mongoose.model('dataModel', dataSchema, 'questions_aggr');
var Question = mongoose.model('questionModel', questionSchema);
var Answer = mongoose.model('answerModel', answerSchema);
var Photo = mongoose.model('photoModel', photoSchema);


let mongodb = {Data, Question, Answer, Photo}

module.exports = mongodb;