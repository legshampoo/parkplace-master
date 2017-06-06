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
      exec('./RestartBrowser.sh', (error, stdout, stderr) => {
      if(error){
        console.error('open error: ' + error);
      }
    })
  }
  
}