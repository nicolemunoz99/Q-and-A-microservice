printjson("hello World222");

	
conn = new Mongo();
 
db = conn.getDB('qanda');

 
printjson({"dbName":db.getName(), "collectionNames": db.getCollectionNames()});

printjson(db.answers.count())


db.photos.aggregate( [ { $group : { _id : "$answer_id", photos: { $push: "$$ROOT" }} }, { $out : "photos_aggr" } ], {allowDiskUse: true} )
db.answers.aggregate( [ { $group : { _id : "$question_id", answers: { $push: "$$ROOT" }} }, { $out : "answers_aggr" } ], {allowDiskUse: true} )
db.questions.aggregate( [ { $group : { _id : "$product_id", questions: { $push: "$$ROOT" }} }, { $out : "questions_aggr" } ], {allowDiskUse: true} )

// import all tables into a single collection using 'mongoimport' with the flag '--mode merge';

// use db.collection.aggregate() to create subdocuments
