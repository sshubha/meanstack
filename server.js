// set up code
var express = require('express');
var app = express(); //creates the app with express
var mongoose = require('mongoose'); //this code is for mongodb
var port = process.env.PORT || 8080;
var database = require('./config/database');
var morgan = require('morgan'); // used to log requests to the console of express
var bodyParser = require('body-parser'); //used to pull info from html post
var methosOverride =  require('method-override'); // simulate delete and put

// configuration
mongoose.connect('mongodb://mean:mean@proximus.modulusmongo.net:27017/eh2eWypi'); //connect to mongoDB on modulus.info

app.use(express.static(__dirname + '/public')); //set the static files location tp /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); //parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //parse application/json
app.use(bodyParser.json({type:'application/vnd.api+json'})); //parse application/vnd.api+json as json
app.use(methosOverride('X-HTTP-Method-Override')); 

var Todo = mongoose.model('Todo',{
	text : {type:String, default: ''}
});


//routes

//api -----------------

//get all todos
app.get('/api/todos', function(req, res)
{
	//using mongoose to retrieve all todos from the database
	Todo.find(function(err, todos)
	{
		//if an error occurs in the process
		if(err)
			res.send(err)

		res.json(todos); //if there is no error return all todos in json format
	});
});

//creating todo and returning all todos after creation
app.post('/api/todos', function(req, res){
	//create a todo 
	Todo.create({
		text : req.body.text,
		done : false
	}, function(err, todo)
	{
		if(err)
			res.send(err);
		//returning all todos after it is created
		Todo.find(function(err, todos){
			if(err)
				res.send(err)
			res.json(todos);
		});
	});
});

//deleting a todo
app.delete('/api/todos/:todo_id', function(req, res){
	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo){
		if(err)
			res.send(err);
		//getting all the todos
		Todo.find(function(err, todos){
			if(err)
				res.send(err)
			res.json(todos);
		});
	});
});

app.get('*', function(req, res){
	res.sendfile('./public/index.html');
});

//start application with node server.js
app.listen(8080);
console.log("The application started listening on port 8080");
