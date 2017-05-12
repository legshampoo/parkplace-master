var path = require('path');
var express = require('express');
// var config = require('./webpack.config.prod');
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

// app.listen(PORT, 'localhost', function(err){
//   if(err){
//     console.log(err);
//     return;
//   }
//
//   console.log('45ParkPlace User Interface Server listening at http://localhost:' + PORT);
// });

const server = app.listen(PORT, 'localhost', function(err){
  if(err){
    console.log(err);
    return;
  }else{
    // open(`http://localhost:${PORT}`);
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
      // console.log('sending emit');
      console.log('registeredSockets.length: ' + registeredSockets.length);
      for(var i = 0; i < registeredSockets.length; i++){
        console.log('socket.io emitting to client: ' + i);
        // registeredSockets[i].emit('message', msg);
      }

      if(socket.length == 0){
        console.log('No clients to relay message to: UI is not connected...');
      }else{
        for(var i = 0; i < socket.length; i++){
          socket[i].send(msg);
        }
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



//------------------------------
//
//  SOCKET.IO
//
//------------------------------
// io.on('connection', (socket) => {
//   // socket.emit('news', { hello: 'world' });
//   console.log('NEW SOCKET.IO CONNECTION, SOCKET ID: ' + socket.id);
//   // registeredSockets[socket.id] = socket;
//   registeredSockets.push(socket);
//
//   socket.on('message', (msg) => {
//     console.log('socket.io message received: ' + msg);
//     socket.send('socket.io echo: ' + msg);
//   });
//
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//     // var index = registeredSockets.indexOf(socket);
//     // registeredSockets.splice(index, 1);
//   });
// });







//------------------------------
//
//  WEBSOCKET SERVER
//
//------------------------------

const WebSocket = require('ws');
const webSocketPort = 5560;
const wss = new WebSocket.Server({ port: webSocketPort });
var socket = [];
var connectionIndex = 0;

wss.on('connection', function connection(ws){
  socket.push(ws);
  // ws.index = connectionIndex;
  // connectionIndex++;
  // console.log('new WebSocket connection #:', connectionIndex);
  console.log('total socket connections: ', socket.length);

  ws.on('message', function incoming(message){
    console.log('WebSocket message received: ' + message);
    ws.send('WebSocket Server echo: ' + message);
  });

  ws.on('close', function(){
    console.log('WebSocket connection closed');
    var index = socket.indexOf(ws);
    socket.splice(index, 1);
  });
});


console.log('45Park WebSocket server started on port: ' + webSocketPort);


//------------------------------
//
//
//
//------------------------------
