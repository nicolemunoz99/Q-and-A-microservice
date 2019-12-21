var express = require('express');
// var router = express.Router();
var router = require('./routes/index.js');
var app = express();
const port = 8000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// date in proper format
const requestTime = function (req, res, next) {
  let month = new Date().getMonth() + 1;
  month = ('0' + month).slice(-2);
  let year = new Date().getFullYear();
  let day = new Date().getDate();
  day = ('0' + day).slice(-2);
  let requestDate = `${year}-${month}-${day}T00:00:00.000Z`;
  console.log('date at app level:', requestDate)
  req.requestDate = requestDate;
  next()
}

app.use(requestTime)

app.use('/qa/', router);

app.use(bodyParser.json())

app.listen(port, () => console.log('Server listening on port ' + port))



