const ip = '192.168.45.122';

//takes the led_id and a true/false for on/off
export function lightingControl(id, on){
  // console.log('unit ID: ' + id + ' LED: ' + on);
  var url = '';
  var state = '';

  if(on){
    state = 'on';
  }else{
    state = 'off';
  }

  //if id is for 'Amenities' use the /group/ path
  if(id === 7){
    url = 'http://' + ip + '/api/group/' + id + '/' + state + '/';
  }else{
    //if it's anything else, use the /space/ path
    url = 'http://' + ip + '/api/space/' + id + '/' + state + '/';
  }

  var params = {
    method: 'GET',
    headers: {
      // 'Accept': 'application/json',
      'Accept': 'text/html',
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
  });
}
