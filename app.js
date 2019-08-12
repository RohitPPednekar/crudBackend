var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var constant = require('./constant');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var server = app.listen( constant.PORT, function() {
    console.log('Express server listening on port ' + server.address().port);
  });


  module.exports = app;