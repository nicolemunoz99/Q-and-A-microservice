printjson("hello World222");

	
conn = new Mongo();
 
db = conn.getDB('qanda');

// drop all collections
db.dropDatabase(); 
 
printjson({"dbName":db.getName(), "collectionNames": db.getCollectionNames()});

printjson(db.testquestions.count())

//mongo clear_collections.js

// mongoimport --db qanda_test --collection answers --type csv --mode merge --headerline --file ../../../data/testanswers.csv

// mongoimport --db qanda_test --collection answers --type csv --mode merge --headerline --file ../../../data/testquestions.csv

// import all tables into a single collection using 'mongoimport' with the flag '--mode merge';

// use db.collection.aggregate() to create subdocuments
