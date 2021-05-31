var express = require('express');
var consign = require('consign')();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var app = express();

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());

consign
       .include('./config/database.js')
       .then('app/models')
       .then('app/controllers')
       .then('app/routes')
       .into(app);

app.set('view engine','ejs');
app.set('views', './app/views');


module.exports = app;
