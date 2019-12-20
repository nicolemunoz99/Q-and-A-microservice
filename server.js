var express = require('express');
// var router = express.Router();
var router = require('./routes/index.js');
var app = express();
const port = 8000;

app.use('/qa/', router);

app.listen(port, () => console.log('Server listening on port ' + port))



