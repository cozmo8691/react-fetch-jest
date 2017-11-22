var express = require('express');
var path = require('path');
var app = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE, OPTIONS');
  next();
});

app.get('/cakes', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.normalize(__dirname + '/cakes.json'))
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
});

