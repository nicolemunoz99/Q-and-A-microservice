// load CSV into 3 separate tables - DONE
// aggregate photos
// THEN, update answers collection with photos
// THEN, aggregate answers
// THEN, update questions collection with answers
// THEN, aggregate questions (on product id)
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/qanda';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var mongoose = require('mongoose');



//Define schemas
var Schema = mongoose.Schema;

var photoAggrSchema = new Schema({});
var answerAggrSchema = new Schema({});
var questionAggrSchema = new Schema({});

var photoSchema = new Schema({});
var Photos = mongoose.model('photoModel', photoSchema, 'photos');
var Answers = mongoose.model('answerModel', new Schema(), 'answers');

console.log('aggregating photos ...')
let timerStart = new Date();
Photos.aggregate( [ { $group : { _id : "$answer_id", photos: { $push: "$$ROOT" }} }, { $out : "photos_aggr" } ]).allowDiskUse(true).exec()
.then(() => { 
  console.log('done aggregating photos...')
  let timerStop = new Date();
  console.log('timer: ', timerStop - timerStart)
  // // answerCursor stuff here
  // const answerCursor = Answers.find({}).cursor();
  // answerCursor.eachAsync(answer => {
  //   console.log('answer', answer, answer.id)
  //   // return updateAnswer(answer.id).then (() => {console.log('updated answer with ID', answer.id)})
  // })
})


var QuestionsAggr = mongoose.model('questionAggrModel', questionAggrSchema, 'questions_aggr')
var AnswersAggr = mongoose.model('answerAggrModel', answerAggrSchema, 'answers_aggr');
var PhotosAggr = mongoose.model('photoAggrModel', photoAggrSchema, 'photos_aggr')


const updateAnswer = (uid) => {
  // console.log(uid)
  return new Promise (
    (resolve, reject) => {
      PhotosAggr.findOne({_id: uid}, (err, photoDocs) => {
        // photoDocs.toArray((err, arr) => {console.log('arr', arr)})
        console.log("photo docs!!!!!!", photoDocs)
        Answers.findOneAndUpdate({id: uid}, {photos: photoDocs}, {new: true}, (err, doc) => {
          resolve(doc);
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
        // Questions.findOneAndUpdate({id: id}, {answers: answerDocs}, {new: true}, (err, doc) => {
        //   resolve(doc);
        // })
        Questions.findOne({id: id}, (err, doc) => {
          resolve(doc);
        })
      })
    }
  )
}


// const questionCursor = Questions.find({}).cursor();



// answerCursor.eachAsync(answer => {
//     let answerDoc = answer;
//     return updateAnswer(answerDoc.id).then (() => {console.log('updated answer with ID', answerDoc.id)})
// })
// .then (() => {
//   console.log('Complete: Answers updated with Photos')
//   questionCursor.eachAsync(question => {
//     let questionDoc = question;
//     return updateQuestion(questionDoc.id).then(() => {console.log('docID: ', questionDoc.id)})
//   }). then (() => {
//     console.log('Complete: Questions updated with Answers \n All Done!!!!!')
//   })
// })

