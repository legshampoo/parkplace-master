var http = require('http');
var fs = require('fs');
var requestTimer = 1000 * 10;

const residenceURL = '/api/residence/';
const residenceFilename = 'data.json';
const nonResidenceURL = '/api/media/';
const nonResidenceFilename = 'media_groups.json';

var options = {
  host: '192.168.45.21',
  path: '/api/residence/',
  method: 'GET',
  headers: {
    Accept: 'application/json'
  },
  cache: 'default'
}

module.exports = {
  residenceData: function(){

    //do it without delay the first time
    requestData();

    //then set it to loop
    setInterval(function(){
      requestData('residence');
      requestData('nonResidence');
    }, requestTimer);

  },

  nonResidenceData: function(){
    console.log('fetch non residence data');
  }
};

function requestData(type){
  console.log('fetching ' + type + ' data');
  var filename = '';

  switch(type){
    case 'residence':
      options.path = residenceURL;
      filename = residenceFilename;
    case 'nonResidence':
      options.path = nonResidenceURL;
      filename = nonResidenceFilename;
    default:
      break;
  }
  // options.path = residencePath;

  var obj = [];

  const request = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);


    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      console.log('received data chunk');
      obj.push(chunk);
    });

    res.on('end', () => {
      console.log('end of response...');

      // try{
      //   var parsedData= JSON.parse(obj);
      //   // console.log(parsedData);
      //   var json = JSON.stringify(parsedData);
      //   // console.log(json);
      //   // console.log(obj);
      //   fs.writeFile('./client/data/' + filename, json, 'utf8', function(){
      //     console.log('finished saving ' + type + ' data to file');
      //   });
      // }catch(e){
      //   console.log(e);
      // }
    });
  });

  request.on('error', (e) => {
    console.log('problem with request: ' + e.message);
  });

  request.end(function(){
    console.log('try to save');
    try{
      var parsedData= JSON.parse(obj);
      // console.log(parsedData);
      var json = JSON.stringify(parsedData);
      // console.log(json);
      // console.log(obj);
      fs.writeFile('./client/data/' + filename, json, 'utf8', function(){
        console.log('finished saving ' + type + ' data to file');
      });
    }catch(e){
      console.log(e);
    }
  });
}
