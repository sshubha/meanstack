// set up code
var express = require('express');
var app = express(); //creates the app with express
var mongoose = require('mongoose'); //this code is for mongodb
var morgan = require('morgan'); // used to log requests to the console of express
var bodyParser = require('body-parser'); //used to pull info from html post
var methosOverride =  require('method-override'); // simulate delete and put

// configuration

mongoose.connect('mongodb://mean:mean@proximus.modulusmongo.net:27017/eh2eWypi'); //connect to mongoDB on modulus.info

app.use(express.static(_dirname + '/public')); //set the static files location tp /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); //parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //parse application/json
app.use(bodyParser.json({type:'application/vnd.api+json'})); //parse application/vnd.api+json as json
app.use(methosOverride()); 

var Todo = mongoose.model('Todo',{
	text : String
});

//start application with node server.js
app.listen(8080);
console.log("The application started listening on port 8080");