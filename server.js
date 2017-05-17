var path = require('path');
var express = require('express');
var getData = require('./RequestData');

var app = express();
var open = require('open');

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV==='dev'){
  var webpack = require('webpack');
  var config = require('./webpack.config.dev');

  var compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else {
  app.use(express.static('dist'))
}


app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

var PORT = 7770;

const server = app.listen(PORT, 'localhost', function(err){
  if(err){
    console.log(err);
    return;
  }else{
    console.log('45ParkPlace User Interface Server listening at http://localhost:' + PORT);
  }
});

const io = require('socket.io')(server);
var registeredSockets = [];

//request apartment data
getData.fetchData('residence');
getData.fetchData('media');


//------------------------------
//
//  SOCKET.IO
//
//------------------------------
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
    socket.emit('server-ping', { data: data })
  }, 60000);

  socket.on('client-ping', (d) => {
    console.log('ping: ' + d.data);
    socket.emit('echo', d);
  });

  socket.on('disconnect', (d) => {
    console.log('user disconnected');
    var index = registeredSockets.indexOf(socket);
    registeredSockets.splice(index, 1);
  });
});



//------------------------------
//
//  TCP SERVER
//
//------------------------------
var net = require('net');
var StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
var tcpServer = net.createServer();
var tcpPort = 5550;

tcpServer.on('connection', handleConnection);

tcpServer.listen(tcpPort, function(){
  console.log('45 Park TCP Server listening on: ', tcpPort);
});

function handleConnection(conn){
  var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
  console.log('new TCP connection from: ' , remoteAddress);

  conn.on('data', onConnData);
  conn.once('close', onConnClose);
  conn.on('error', onConnError);

  function onConnData(d){
    try{
      var msg = decoder.write(d);
      console.log(JSON.parse(msg));

      //socket.io broadcast here
      // console.log('registeredSockets.length: ' + registeredSockets.length);
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
