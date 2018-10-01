var path = require('path');
var express = require('express');
var bodyparser = require('body-parser');
var morgan      = require('morgan');
var connection = require('./connection');
var routes = require('./routes');
var multer	=  require('multer');
var mongoose = require('mongoose');



var app = express();
app.use(bodyparser.urlencoded({limit: "50mb", extended: true,  parameterLimit:50000}));
app.use(bodyparser.json({limit: "50mb"}));
app.use(morgan('dev'));



mongoose.connect('mongodb://localhost/mean-angular6', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));




app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('tokenSecret', 'secr3t');
app.use(express.static(path.join(__dirname, './www')));

app.get('/', function(req, res) {

	res.send('Hello! The API is up and running');
});


connection.init();
routes.configure(app);
var server = app.listen(5000, function() {
  console.log('Server listening on port ' + server.address().port);
});