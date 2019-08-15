var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var constant = require('./constant');
var models= require('./models');
var index= require('./routes/index');
var cors = require('cors');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
var models = require("./models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use(function (req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/',index);

models.sequelize.sync().then(function () {
  var server = app.listen( constant.PORT, function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});




  module.exports = app;