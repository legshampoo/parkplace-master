
//ip address of model LED lighting computer
// const ip = '192.168.45.122';  // localhost...
const ip = '192.168.45.124';  //new ip address

//takes the led_id and a true/false for on/off
export function lightingControl(id, on){
  // console.log('unit ID: ' + id + ' LED: ' + on);

  // console.log(`Sending: ${id} ${on}`);

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
  // console.log(`setting params`);
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

  // console.log(`fetching`);
  console.log(`Sending LED: ${id}, ${on}`);

  console.log(url);
  
  fetch(url).then(function(response){
    // console.log(`checking response`);
    if(!response.ok){
      // console.log(`response NOT ok`);
      throw Error(response.statusText);
    }
    // console.log(`returning response`);
    return response;
  }).then(function(error){
    // console.log(`response error?`);
    console.log(error);
  });
}


export function lightingControl_ALL_OFF(){
  console.log('sending ALL OFF command to LED lights');

  var url = 'http://' + ip + '/api/config/2/off/';

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

  fetch(url)
  .then(function(response){
    if(!response.ok){
      throw Error(response.statusText);
    }
    console.log(response);
    return response;
  })
  .then(function(error){
    console.log(error);
  });
  
}
