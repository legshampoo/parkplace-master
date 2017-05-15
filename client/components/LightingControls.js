const ip = '192.168.45.122';

//takes the led_id and a true/false for on/off
export function lightingControl(id, on){
  console.log('unit ID: ' + id + ' LED: ' + on);
  var state = '';

  if(on){
    state = 'on';
  }else{
    state = 'off';
  }

  var url = 'http://' + ip + '/api/space/' + id + '/' + state + '/';

  var params = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    mode: 'no-cors'
  }

  fetch(url).then(function(response){
    if(!response.ok){
      throw Error(response.statusText);
    }
    return response;
  }).then(function(error){
    console.log(error);
  }).then(function(){
    console.log('led lighting command sent');
  });
}
