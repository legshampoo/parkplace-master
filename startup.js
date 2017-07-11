const exec = require('child_process').exec;


module.exports = {
  killBrowser: function(){
    exec('pkill -a -i "Google Chrome"', (error, stdout, stderr) => {
      if(error){
        console.error('exec error: ' + error);
        return;
      }else{
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
      }
    });
  },

  openBrowser: function(){
    //comment this out when devving, otherwise you can't use console
      exec('./RestartBrowser.sh', (error, stdout, stderr) => {
        if(error){
          console.error('open error: ' + error);
        }
      })
  },

  killServer: function(){
    var killTimer = 30000;
    console.log('APPLICATION WILL BE KILLED IN ' + killTimer / 1000 + ' SECONDS');
    setTimeout(function(){
      console.log('KILLING APPLICATION');
      process.kill(process.pid)
    }, killTimer);
  }
  
}