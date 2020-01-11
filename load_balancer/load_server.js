// var newrelic = require('newrelic');
const express = require('express');
const router = express.Router();
const request = require('request');
const app = express();

const sqlServers = ['http://3.133.103.199:6666', 'http://52.14.195.142:6666', 'http://3.17.133.22:6666'];
let index = 0;

const noSqlServers = ['http://3.133.103.199:8000', 'http://52.14.195.142:8000', 'http://3.17.133.22:8000'];

let servers;

const handler = (req, res) => {
  if (req.query.db === 'nosql') {
    console.log('nosql')
  }
  servers = req.query.db === 'nosql' ? noSqlServers : sqlServers;
  req.pipe(request({url: servers[index] + req.url})).pipe(res);
  index = (index + 1) % servers.length;
};

// load-io access
app.get('/loaderio-c63df928f580dbf278b6ce3dd6e6b1dd.txt', (req, res) => {
  res.sendfile('./loaderio-c63df928f580dbf278b6ce3dd6e6b1dd.txt');
});

const server = app.get('*', handler).post('*', handler).put('*', handler).delete('*', handler);

server.listen(8000);