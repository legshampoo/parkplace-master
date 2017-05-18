import store from '../store';


function fetchData(type, callback){
  console.log('fetching data type: ' + type);

  // var json = {};
  var url = '';

  if(type === 'residence'){
    url = 'http://192.168.45.21/api/residence/';
  }else{
    url = 'http://192.168.45.21/api/media/';
  }

  fetch(url)
  .then(res => res.json())
  .then((out) => {
    // var jsonString = JSON.stringify(out);
    // console.log(jsonString);
    // console.log(out);
    callback(out);
  })
  .catch(err => console.error(err));
}


//finds the unit ID stored in the current state
//in json the penthouses are called 'Unit PH A' and 'Unit PH B'
export function getUnitId(){
  var unitId = '';

  //if the current tag is PH1 or PH2
  if(store.getState().current.currentTag == 'PHA' || store.getState().current.currentTag == 'PHB'){
    unitId = store.getState().current.currentTag;
    if(unitId == 'PHA' || unitId == 'PHB'){
      unitId = unitId.slice(0, 2) + " " + unitId.slice(2);
    }
  }else{
    unitId = store.getState().current.currentUnit;
    if(unitId == 'PHA' || unitId == 'PHB'){
      unitId = unitId.slice(0, 2) + " " + unitId.slice(2);
    }
  }

  return unitId;
}


//make sure the unit exists, if user is typing it in
export function checkUnitExists(unit, callback){
  var found = false;

  if(unit === 'PHA' || unit === 'PHB'){
    if(unit === 'PHA'){
      unit = 'PH A';
    }
    if(unit === 'PHB'){
      unit = 'PH B';
    }
  }else{

  }

  fetchData('residence', function(d){
    console.log('trying');

    try{
      Object.keys(d).map(function(key, index){
        if(d[key].name == unit){
          found = true;
          console.log('unit found: ' + found);
        }
      });
    }catch(err){
      console.log('unit exists errrr');
    }

    return found;
  })
}

export function getAssets(type, callback){
  var unitData = {};
  fetchData(type, function(data){
    try{
      Object.keys(data).map(function(key, index){
        if(data[key].name == val){
          unitData = data[key];
        }
      });
    }catch(err){
      console.log('errrrerrrerer');
    }

    callback(unitData);
  }

}

export function checkIfEmpty(obj){
  try{
    return Object.keys(obj).length === 0;
  }catch(e){
    return true;
  }
  return false;
}

export function getLightingId(val){
  var dataset = {};
  var led_id = 0;

  if(val === 'Amenities'){
    led_id = 7;
  }else{
    if(val === 'PHA'){
      val = 'PH A';
    }
    if(val === 'PHB'){
      val = 'PH B';
    }
    // dataset = residence;
    dataset = fetchData('residence', function(dataset){
      try{
        Object.keys(dataset).map(function(key, index){
          if(dataset[key].name == val){
            led_id = dataset[key].led_id;
          }
        })
      }catch(err){
        console.log('error finding led_id');
      }
    })
  }



  return led_id;
}
