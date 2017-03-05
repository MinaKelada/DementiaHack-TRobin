// basics
var express = require ('express');
var db = require('./db.js')
var app = express();

// extras
var http = require('http');
var path = require('path');
var fs = require('fs');
//var favicon = require('serve-favicon');

var config = require('./config')();

// route require list
var routes = require('./routes/index.js');
var careGiverRoutes = require('./routes/caregiverroutes.js');
var taskRoutes = require('./routes/taskroutes.js');
// registering routes to express list
app.use('/api/', routes);
app.use('/api/caregiver/', careGiverRoutes);
app.use('/api/task/', taskRoutes);
// middleware
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});




// once the system is loaded...
// Start database, if successful start app server

db.connect(config.connstr, function (err){
  if(err){
    console.error(err);
  } else {

    app.listen(config.port, function() {
      console.log('Listening on port ' + config.port + '...');
    });

  }
});
var config = require('./config')();
