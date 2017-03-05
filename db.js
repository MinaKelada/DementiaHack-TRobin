var mongoose = require('mongoose');
var config = require('./config');

var state = {
  db: null
};

module.exports.connect = function (url, callback){
  if (state.db) {
    return callback();
  }

  mongoose.connect(url, function(err, db) {
    if (err) {
      console.log("couldn't connect to database");
      return callback(err);
    }

    console.log("connected to database");

    state.db = db;
    callback();
  });
};

module.exports.get = function() {
  return state.db;
};

module.exports.close = function(callback){
  if (state.db){
    state.db.close(function(err, result) {
      state.db = null;
      state.mode = null;
      callback(err);
    });
  }
};
