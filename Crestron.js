var net = require('net');
var client;
var address = '192.168.45.169';
var port = 5153;
var timeout = 5000;
var reconnectTimer = 30000;
var toggleTimer = 10000;

module.exports = {

  connect: function(){
    console.log('Crestron CONNECTING...');

    var _this = this;

    client = new net.Socket();

    //set the timeout for devving, remove for production?
    client.setTimeout(timeout, function(){
      console.log('Crestron Timeout set to ' + (timeout / 1000));
    });

    //open the connection and send a heartbeat message
    client.connect(port, address, function(){
      console.log('Crestron CONNECTION ESTABLISHED');

      var heartbeat = {
        'from': 'PGS_Table_UI',
        'status': 'alive',
        'conductor': 'connected'
      }

      var msg = JSON.stringify(heartbeat);
      client.write(msg);

      var toggle = false;

      //test lighting message
      setInterval(function(){
        var toggleLights = {
          'lights': ''
        }
        toggle = !toggle;
        if(toggle){
          toggleLights.lights = 'on';
        }else{
          toggleLights.lights = 'off';
        }

        var msg = JSON.stringify(toggleLights);
        console.log(msg);
        client.write(msg);
      }, toggleTimer);

    }).on('error', function(err){
      console.log(err);
    });

    client.on('data', function(data){
      console.log('Crestron DATA: ' + data);
    });

    client.on('close', function(){
      console.log('Connection to Crestron CLOSED');

      setTimeout(function(){
        console.log('attemptimg to reconnect Crestron...');
        _this.connect();
      }, reconnectTimer);
    });

    // client.on('end', function(){
    //   console.log('Connection to Crestron END');
    // });


    // client.on('timeout', function(){
    //   console.log('Crestron TIME OUT');
    //   console.log('Re-trying Crestron Connection...');
    //   _this.connect();
    // });
  },

  send: function(cmd){
    console.log(cmd);
    client.write(cmd);
  }
}
