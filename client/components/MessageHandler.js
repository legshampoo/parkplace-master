var ip = '192.168.45.21';
// var url = 'http://192.168.45.21'
const socketPortCMS = 8080;
// const socketPortCMS = 5560;  //localhost port
var socketCMS;

const io = require('socket.io-client');

export function openSocketCMS(){
  // console.log('connn');
  var options = {
    reconnection: true,
    reconnectionDelay: 1000,
    timeout: 5000
  }
  // var socket = io.connect('http://192.168.45.21:8080');
  var socket = io.connect('ws://' + ip + ':' + socketPortCMS);
  socket.on('connect', d => {
    console.log('CMS socket connected');
  });
}


export function socketConnectCMS(){

  socketCMS = new WebSocket('ws://' + ip + ':' + socketPortCMS);
  // socketCMS = new WebSocket('ws://192.168.45.21:8080');

  socketCMS.onopen = function(event){
    console.log('Websocket connecting to CMS: ' + event.currentTarget.URL);
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
    console.log(event.data);
  }
}

export function sendCommand(msg){
  var message = JSON.stringify(msg);
  console.log('sending message: ');
  console.log(message);
  socketCMS.send(message);
}


export function addToFolio(path){
  console.log('Sending ADD TO FOLIO: ' + path);

  // var url = 'http://192.168.45.21/api/folio/';
  var url = 'http://' + ip + '/api/folio/';

  var message = {
    'url': path
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    mode: 'no-cors',
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
