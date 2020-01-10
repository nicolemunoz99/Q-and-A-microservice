// var newrelic = require('newrelic');
const express = require('express');
const request = require('request');
const app = express();

const servers = ['http://3.17.133.22:8000', 'http://52.14.195.142:8000', 'http://3.133.103.199:8000'];
let index = 0;

const handler = (req, res) => {
  req.pipe(request({url: servers[index] + req.url})).pipe(res);
  index = (index + 1) % servers.length;
}

// load-io access key
app.get('/loaderio-c63df928f580dbf278b6ce3dd6e6b1dd.txt', (req, res) => {
  res.sendfile('./loaderio-c63df928f580dbf278b6ce3dd6e6b1dd.txt');
})

const server = app.get('*', handler).post('*', handler).put('*', handler).delete('*', handler);

server.listen(7500);