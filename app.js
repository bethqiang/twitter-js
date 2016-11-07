const express = require('express');
const app = express();
const port = 3000;
const volleyball = require('volleyball');

app.listen(port, function() {
  console.log("server listening");
})

app.use(volleyball);

app.use('/', function(req, res, next) {
  console.log(req.method, req.path);
  next();
})

app.use('/special/', function(req, res, next) {
  console.log("you reached the special area");
  next();
})

app.get('/', function(req, res) {
  res.send("Hello World!");
})

// app.get('/special/')