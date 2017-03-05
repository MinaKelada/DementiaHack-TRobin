
import cookie from 'react-cookie';
var http = require('http'); // to send request
var qs = require('qs'); // to send data inside the request

var url = "http://bolgarov.zapto.org"
var port = 11035

var httpGen = {
  //
  // options is json, will include 'data', 'path', and 'method'
  // 'data' must be a JSON object, non-stringified, can be empty but not null, for now I'm forcing data to enter until I know what can require data or not
  // 'path' and 'method' must be strings
  // optional options are: 'onData', 'onError', 'onEnd'
  generate: function(options) {

    if (!options.method || options.method == null){
      return console.error("httpGen requires method");
    }
    if (!options.path || options.path == null){
      return console.error("httpGen requires path");
    }

    var userToken = cookie.load('userToken');

    var fullData = {
      data: options.data,
      token: userToken
    }

    var dataQuerystring = qs.stringify(fullData);

    var httpOptions = {
      port: port,
      path: url + options.path,
      method: options.method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(dataQuerystring),
        'Accept': 'application/json'
      }
    }

    var req = http.request(httpOptions, (res) => {

      if (options.onData && options.onData != null){
        res.on('data', options.onData)
      }
      if (options.onEnd && options.onEnd != null){
        res.on('end', options.onEnd)
      }

    })

    if (options.onError && options.onError != null){
      req.on('error', options.onError)
    }


    req.write(dataQuerystring);

    req.end();

  },

  getToken: function() {
    var userToken = cookie.load('userToken');
    return userToken;
  }

}

module.exports = httpGen;
