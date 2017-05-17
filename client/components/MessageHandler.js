var ip = '192.168.45.21';
// var url = 'http://192.168.45.21'
const socketPortCMS = 8080;
// const socketPortCMS = 5560;  //localhost port
var socketCMS;

// const io = require('socket.io-client');

// export function openSocketCMS(){
  // var url = 'ws://192.168.45.21:8080';
  // var options = {
  //   path: '/',
  //   reconnection: true,
  //   reconnectionDelay: 1000,
  //   timeout: 5000,
  //   transports: ['websocket', 'polling']
  // }
  // var socket = io.connect(url, options);
  // socket.on('connect', d => {
  //   console.log('CMS socketIO CONNECTED');
  // });
// }


export function socketConnectCMS(){
  console.log('Attempting to connect to CMS...');

  socketCMS = new WebSocket('ws://' + ip + ':' + socketPortCMS);

  socketCMS.onopen = function(event){
    console.log('CMS WEBSOCKET CONNECTED');
  }

  socketCMS.onmessage = event => {
    try{
      var json = JSON.parse(event.data);
      console.log(json);
    }catch(e){
      console.log('CMS Socket Received Message but encountered an error:');
      console.log(e);
    }
  }

  socketCMS.onerror = event => {
    console.log('ERROR Connecting to CMS');
    console.log(event.data);
    reconnectCMS();
  }
}

function reconnectCMS(){
  setTimeout(function(){
    console.log('Reconnect CMS...');
    socketConnectCMS();
  }, 5000);
}

export function sendCommand(msg){
  console.log('sending');
  var message = JSON.stringify(msg);

  switch(socketCMS.readyState){
    case 0:  //connecting
      console.log('socket is in CONNECTING STATE, cant send message.  Attempting to reconnect...');
      reconnectCMS();
      break;
    case 1:   //open
      console.log('socket is OPEN, sending command...');
      console.log(message);
      socketCMS.send(message);
      break;
    case 2:  //closing
      console.log('socket is in CLOSING state, cant send.  Attempting to Reconnect');
      reconnectCMS();
      break;
    case 3:  //closed
      console.log('socket is CLOSED, attempting to reconnect...');
      reconnectCMS();
      break;
    default:
      console.log('default');
      break;
  }
}


export function addToFolio(path){
  console.log('Sending ADD TO FOLIO: ' + path);

  // var url = 'http://' + ip + '/api/folio/';
  var url = 'http://192.168.45.21/api/folio/';

  var message = {
    'url': path
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({message})
  }).then(function(response){
    if(!response.ok){
      throw Error(response.statusText);
    }
    return response;
  }).then(function(error){
    console.log(error);
  });
}


export var fitHorizontal = {
  'command': 'fit',
  'to': 'wall',
  'params': {
    'axis': 'width'
  }
}

export var fitVertical = {
  'command': 'fit',
  'to': 'wall',
  'params': {
    'axis': 'height'
  }
}

export var panLeft = {
  'command': 'pan',
  'to': 'wall',
  'params': {
    'direction': 'left'
  }
}

export var panRight = {
  'command': 'pan',
  'to': 'wall',
  'params': {
    'direction': 'right'
  }
}

export var panCenter = {
  'command': 'pan',
  'to': 'wall',
  'params': {
    'direction': 'center'
  }
}

export var play = {
  'command': 'play',
  'to': 'wall',
  'params': {
    'url': 'path'
  }
}

export var restart = {
  'command': 'restart',
  'to': 'wall',
  'params': {
    'url': 'path'
  }
}

export var assetSelection = {
  'command': 'select-asset',
  'to': 'wall',
  'params': {
    'url': 'path'
  }
}

export var compareMode = {
  'command': 'compare-mode',
  'to': 'wall',
  'params': {
    'unit1': 'unit1',
    'unit2': 'unit2'
  }
}
