conn = new Mongo();
 
db = conn.getDB('qanda');

// db.questions.createIndex( {product_id: 1} );
// db.questions.createIndex( {id: 1} )

// db.answers.createIndex( {question_id: 1} );
// db.answers.createIndex( {id: 1} )

// db.photos.createIndex( {answer_id: 1} );
 
printjson({"dbName":db.getName(), "collectionNames": db.getCollectionNames()});

// db.photos.aggregate( [ { $group : { _id : "$answer_id", photos: { $push: "$$ROOT" }} }, { $out : "photos_aggr" } ], {allowDiskUse: true} )

let i = 0;
// db.photos_aggr.forEach
// db.photos_aggr.find().forEach(function(doc) {
//   db.answers.findOneAndUpdate({id: doc._id}, {$set: {"photos": doc.photos}}, {returnNewDocument: true})
//   if (i % 5000 === 0) {
//     printjson({'i':i})
//   }
//   i++
// })

// i = 0;
// printjson('done updating answers with photos')
// printjson('now aggregating answers...')

// db.answers.aggregate( [ { $group : { _id : "$question_id", answers: { $push: "$$ROOT" }} }, { $out : "answers_aggr" } ], {allowDiskUse: true} )


// printjson('now updating questions with answers...')

// db.answers_aggr.find().forEach(function(doc) {
//   db.questions.findOneAndUpdate({id: doc._id}, {$set: {"answers": doc.answers}})
//   if (i % 5000 === 0) {
//     printjson({'i':i})
//   }
//   i++
// })


// printjson('done updating questions with answers')
printjson('now aggregating questions...')

db.questions.aggregate( [ { $group : { _id : "$product_id", questions: { $push: "$$ROOT" }} }, { $out : "questions_aggr" } ], {allowDiskUse: true} )

printjson('DONE CREATING DB')

