const express = require('express');
const app = express();
const port = 3000;

app.listen(port, function() {
  console.log("server listening");
})

app.get('/', function(req, res) {
  res.send("Hello World!");
})