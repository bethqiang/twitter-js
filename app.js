const express = require('express');
const app = express();
const port = 3000;
const nunjucks = require('nunjucks');
const routes = require('./routes/');
const bodyParser = require('body-parser');

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', { noCache: true });

// logging middleware
app.use('/', function(req, res, next) {
  console.log(req.method, req.path, res.statusCode);
  next();
});

// parse application/x-www-form-urlencoded, for HTML form submits
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json, would be for AJAX requests
app.use(bodyParser.json());

// start server
app.listen(port, function() {
  console.log('Server listening on port ' + port);
});

app.use(express.static('public'));
app.use('/', routes);
