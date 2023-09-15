var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');

var apiController = require('./controllers/apiController.js');
var recipeController = require('./controllers/recipeController.js');

var port = process.env.PORT || 3000;


app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


mongoose.connect(config.getDbConnectionString());

apiController(app);
recipeController(app);

app.listen(port);