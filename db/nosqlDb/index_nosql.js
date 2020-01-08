var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/qanda';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var mongoose = require('mongoose');



//Define schemas
var Schema = mongoose.Schema;

var dataSchema = new Schema({});

dataSchema.statics.getByProduct = cb => {
  return this.model
}

var Data = mongoose.model('dataModel', dataSchema, 'data');



module.exports = mongoQuery;