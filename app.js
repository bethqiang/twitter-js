const express = require('express');
const app = express();
const port = 3000;
// not necessary right now--we made our own logging middleware
// const volleyball = require('volleyball');
const nunjucks = require('nunjucks');

app.listen(port, function() {
  console.log("server listening");
})

// app.use(volleyball);

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

const locals = {
  people: [
  {name: 'Gandalf'},
  {name: 'Frodo'},
  {name: 'Hermione'}
]}

// const people = {
//   name: 'Gandalf',
//   name: 'Frodo',
//   name: 'Hermione'
// } => why not this???

nunjucks.configure('views')
nunjucks.render('index.html', locals, function(err, output) {
  if (err) throw err;
  console.log(output);
})
// i'm confused by basically all of this
