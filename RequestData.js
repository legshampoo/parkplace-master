var http = require('http');
var fs = require('fs');
var request = require('request');
var fetchTimer = 1000 * 60;
var requestTimeout = 1000 * 10;

module.exports = {
  //-----------------------------
  // Request JSON - 'type' is either 'unit' or 'media'
  // callback takes the returned data and relays it to
  // browser client
  //-----------------------------
  fetchData: function(type, callback){
    var _this = this;
    var residenceURL = '/residence/';
    var nonResidenceURL = '/media/';

    console.log('fetching ' + type + ' data...');

    var options = {
      baseUrl: 'http://192.168.45.21/api',
      uri: '',
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },
      cache: 'default',
      timeout: requestTimeout
    }

    //construct the path to data type
    options.uri = '/' + type + '/';

    //make the request for data
    request(options, function (error, response, body) {

      //if there's no error and status code is 'OK'
      if (!error && response.statusCode === 200) {
        console.log('Request for ' + type + ' data successful...');
        try{
          var parsedData= JSON.parse(body);
          var json = JSON.stringify(parsedData, null, 2);

          //make the Request again later
          setTimeout(function(){
            _this.fetchData(type, callback);
          }, fetchTimer);

          //pass the returned JSON to whatever function was passed in
          callback(json);

        }catch(e){
          //if there's an error, retry the Request immediately
          console.log(e);
          console.log('Error Requesting ' + type + ' JSON, attempting Request again...');
          _this.fetchData(type, callback);
        }
      }else{
        //if there's a request error, retry
        console.log(error);
        console.log('Error Requesting ' + type + ' JSON, attempting Request again...');
        _this.fetchData(type, callback);
      }
    })
  }
};
