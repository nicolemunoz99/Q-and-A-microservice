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

var Questions = mongoose.model('questionModel', questionSchema, 'testquestions')
var Answers = mongoose.model('answerModel', answerSchema, 'testanswers');
var Photos = mongoose.model('photoModel', photoSchema, 'photos')


const updateAnswer = (id) => {
  // console.log(id)
  return new Promise (
    (resolve, reject) => {
      Photos.find({answer_id: id}, (err, photoDocs) => {
        // photoDocs.toArray((err, arr) => {console.log('arr', arr)})
        Answers.findOneAndUpdate({id: id}, {photos: photoDocs}, {new: true}, (err, doc) => {
          resolve(doc)
        })
      })
    }
  )
}

const updateQuestion = (id) => {
  return new Promise (
    (resolve, reject) => {
      Answers.find({question_id: id}, (err, answerDocs) => {
        console.log('answerDocs', answerDocs)
        Questions.findOneAndUpdate({id: id}, {answers: answerDocs}, {new: true}, (err, doc) => {
          resolve(doc);
        })
      })
    }
  )
}

const answerCursor = Answers.find({}).cursor();
const questionCursor = Questions.find({}).cursor();


answerCursor.eachAsync(answer => {
    let answerDoc = answer;
    return updateAnswer(answerDoc.id).then (() => {console.log('updated answer with ID', answerDoc.id)})
})
// .then (() => {
//   console.log('Complete: Answers updated with Photos')
//   questionCursor.eachAsync(question => {
//     let questionDoc = question;
//     return updateQuestion(questionDoc.id).then(() => {console.log('docID: ', questionDoc.id)})
//   }). then (() => {
//     console.log('Complete: Questions updated with Answers \n All Done!!!!!')
//   })
// })

