const express = require('express');
const app = express();
const port = 3000;
// not necessary right now--we made our own logging middleware
// const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const routes = require('./routes/');

app.listen(port, function() {
  console.log("server listening");
})

// app.use(volleyball);

app.use('/', function(req, res, next) {
  console.log(req.method, req.path);
  next();
})

// app.use('/special/', function(req, res, next) {
//   console.log("you reached the special area");
//   next();
// })

app.get('/', function(req, res) {
  res.send("Hello World!");
})

// const locals = {
//   people: [
//   {name: 'Gandalf'},
//   {name: 'Frodo'},
//   {name: 'Hermione'}
// ]}

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

nunjucks.configure('views', { noCache: true });
//nunjucks.render('index.html', locals, function(err, output) {
//  if (err) throw err;
//  console.log(output);
//})


// app.get('/people/', function(req, res){
//   res.render( 'index', {people: locals.people}, function(err, html) {
//     res.send(html);
// });
// });

app.use('/', routes);
