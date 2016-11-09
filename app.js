const express = require('express');
const app = express();
const port = 3000;
const nunjucks = require('nunjucks');
const routes = require('./routes/');

app.listen(port, function() {
  console.log('Server listening on port' + port);
});

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', { noCache: true });

app.use('/', function(req, res, next) {
  console.log(req.method, req.path, res.statusCode);
  next();
});

app.use('/', routes);
