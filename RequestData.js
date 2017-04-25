var http = require('http');
var fs = require('fs');
var request = require('request');
var fetchTimer = 1000 * 60;
var requestTimeout = 1000 * 10;

const residenceURL = '/residence/';
const residenceFilename = 'data.json';
const nonResidenceURL = '/media/';
const nonResidenceFilename = 'media_groups.json';

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

module.exports = {

  //fetch data, type passed in argument
  //if successful, set a timer to request again later
  //if not successful, try again immediately
  fetchData: function(type){
    var _this = this;

    console.log('fetching ' + type + ' data...');

    //build the path to data type
    options.uri = '/' + type + '/';

    //make the request for data
    request(options, function (error, response, body) {

      //if there's no error and status code is 'OK'
      if (!error && response.statusCode === 200) {
        console.log('Request for ' + type + ' data successful...');
        try{
          var parsedData= JSON.parse(body);
          var json = JSON.stringify(parsedData, null, 2);

          fs.writeFile('./client/data/' + type + '.json', json, 'utf8', function(){
            console.log('finished saving ' + type + ' data to file');
            console.log('Another request for ' + type + ' data will occur in ' + fetchTimer / 1000 + ' seconds');
            //if successful, set it to repeat later
            setTimeout(function(){
              _this.fetchData(type);
            }, fetchTimer);
          });
        }catch(e){
          //if there's a save to file error, retry
          console.log(e);
          console.log('File save error, attempting ' + type + ' data request immediately...');
          _this.fetchData(type);
        }
      }else{
        //if there's a request error, retry
        console.log(error);
        console.log('GET request error, attempting ' + type + ' data request immediately...');
        _this.fetchData(type);
      }
    })
  }
};
