const ip = '192.168.45.122';

//takes the led_id and a true/false for on/off
export function lightingControl(id, on){
  // console.log('unit ID: ' + id + ' LED: ' + on);

  console.log(`Sending: ${id} ${on}`);

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
  console.log(`setting params`);
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

  console.log(`fetching`);
  fetch(url).then(function(response){
    console.log(`checking response`);
    if(!response.ok){
      console.log(`response NOT ok`);
      throw Error(response.statusText);
    }
    console.log(`returning response`);
    return response;
  }).then(function(error){
    console.log(`response error?`);
    console.log(error);
  });
}
