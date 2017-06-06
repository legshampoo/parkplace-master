var path = require('path');
var express = require('express');
var open = require('open');   //not used anymore
var getData = require('./RequestData');  //for handling cms data
var startup = require('./startup');  //for handling startup/restart/crash processes


//------------------------------
//
//  HTTP Server
//
//------------------------------
var app = express();

var PORT = 7770;
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'dev'){
  //if dev environment, use webpack and HMR
  var webpack = require('webpack');
  var config = require('./webpack.config.dev');

  var compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else {
  //else serve the production build
  app.use(express.static('dist'))
}

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});




//------------------------------
//
// KILL THE BROWSER, then wait and start the browser again
//
//------------------------------
var waitBeforeRestart = 5000;

//kill chrome
startup.killBrowser();

//open chrome in kiosk mode in 5 seconds
setTimeout(startup.openBrowser, waitBeforeRestart);




//------------------------------
//
//  start the HTTP server
//
//------------------------------
const server = app.listen(PORT, 'localhost', function(err){
  if(err){
    console.log(err);
    return;
  }else{
    console.log('45ParkPlace User Interface Server listening at http://localhost:' + PORT);
  }
});






//------------------------------
//
//  SOCKET.IO
//
//------------------------------
const io = require('socket.io')(server);
var registeredSockets = [];

io.on('connection', (socket) => {
  console.log('NEW SOCKET.IO CONNECTION, SOCKET ID: ' + socket.id);
  registeredSockets.push(socket);
  console.log('total sockets connected: ' + registeredSockets.length);

  var serverMessage = 'connection with http://localhost:7770 has been established'
  socket.emit('connection-established', {
    data: serverMessage
  });

  var pingInterval = setInterval(function(){
    var data = 'Localhost Heartbeat';
    socket.emit('server-heartbeat', { data: data })
  }, 60000);

  socket.on('request-assets', (d) => {
    console.log('client requesting ' + d.type + ' assets');
    if(d.type === 'residences'){
      socket.emit('residence-assets', { data: residenceAssets });
    }else if(d.type === 'media'){
      socket.emit('media-assets', { data: mediaAssets });
    }
  });

  socket.on('crestron-command', (d) => {
    crestron.send(d);
  })

  socket.on('disconnect', (d) => {
    console.log('user disconnected');
    var index = registeredSockets.indexOf(socket);
    registeredSockets.splice(index, 1);
  });
});





//----------------------------------------
//
//  REQUEST DATA FROM CMS AND THEN RELAY TO CLIENT
//
//----------------------------------------

//empty objects to temporarily store JSON
var residenceAssets = {};
var mediaAssets = {};

//makes a Request for JSON and then sets a timer to repeat indefinitely
getData.fetchData('residence', function(d){
  console.log('Sending Residence Assets JSON to Client');
  residenceAssets = JSON.parse(d);
  for(var i = 0; i < registeredSockets.length; i++){
    registeredSockets[i].emit('residence-assets', { data: residenceAssets });
  }
});

//makes a Request for JSON and then sets a timer to repeat indefinitely
getData.fetchData('media', function(d){
  console.log('Sending Media Assets JSON to Client');
  mediaAssets = JSON.parse(d);
  for(var i = 0; i < registeredSockets.length; i++){
    registeredSockets[i].emit('media-assets', { data: mediaAssets });
  }
});





//------------------------------
//
//  TCP SERVER (for communicating with RFID tags)
//
//------------------------------
var net = require('net');
var StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
var tcpServer = net.createServer();
var tcpPort = 5550;


//start the TCP server
tcpServer.listen(tcpPort, function(){
  console.log('45 Park TCP Server listening on: ', tcpPort);
});

//on connection, handle it with function
tcpServer.on('connection', handleConnection);

//on connection...
function handleConnection(conn){
  var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
  console.log('New TCP connection from Client: ' , remoteAddress);

  conn.on('data', onConnData);
  conn.once('close', onConnClose);
  conn.on('error', onConnError);

  //on message received
  function onConnData(d){
    try{
      var msg = decoder.write(d);
      console.log(JSON.parse(msg));

      //For each socket.io connection, emit the message to Client
      for(var i = 0; i < registeredSockets.length; i++){
        console.log('socket.io emitting to client: ' + i);
        registeredSockets[i].emit('message', { data: msg });
      }
    }catch(e){
      console.log('errrrrror:', e);
    }
  }

  function onConnClose(err){
    console.log('connection from %s error: %s', remoteAddress, err.message);
  }

  function onConnError(err){
    console.log('Connection %s error: %s', remoteAddress, err.message);
  }
}


//----------------------------------
//
//  TCP Client Messaging to Crestron
//
//----------------------------------
var crestron = require('./Crestron');

crestron.connect();






//------------------------------
//
//  TESTING THE CRASH (comment this out for deployment)
//
//------------------------------

// var killTimer = 30000;
// console.log('APPLICATION WILL BE KILLED IN ' + killTimer / 1000 + ' SECONDS');
// setTimeout(function(){
//   console.log('KILLING APPLICATION');
//   process.kill(process.pid)
// }, killTimer);
