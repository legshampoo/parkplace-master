var ip = '192.168.45.21';
const socketPortCMS = 8080;
var socketCMS;

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
  var message = JSON.stringify(msg);

  switch(socketCMS.readyState){
    case 0:  //connecting
      console.log('socket is in CONNECTING STATE, cant send message.  Attempting to reconnect...');
      reconnectCMS();
      break;
    case 1:   //open
      // console.log('socket is OPEN, sending command:');
      console.log(message);
      // console.log(msg);
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

export var resume = {
  'command': 'resume',
  'to': 'wall'
}

export var pause = {
  'command': 'pause',
  'to': 'wall'
}

export var rewind = {
  'command': 'rewind',
  'to': 'wall'
}

// export var assetSelection = {
//   'command': 'select-asset',
//   'to': 'wall',
//   'params': {
//     'url': 'path',
//     'canvas': ''
//   }
// }

export function assetSelection() {
  this.command = 'select-asset',
  this.to = 'wall',
  this.params = {
    'url': '/asset-path',
    'canvas': ''
  }
}
