import store from '../store';
import residence from '../data/residence';
import media from '../data/media';

export function combineAssets(d, type){
  var data = [];

  //the unit type determines how far down the tree to go
  if(type === 'Unit' || type === 'Unit_Penthouse'){
    // console.log(d);
    data = d.media;
    // console.log(data);
    for(var i = 0; i < data.length; i++){
      data[i].type = 'photo';
    }
  }else{
    //consolidate non unit photos and videos into one array
    for(var i = 0; i < d.videos.length; i++){
      d.videos[i].type = 'video';
      data.push(d.videos[i]);
    }
    for(var i = 0; i < d.photos.length; i++){
      d.photos[i].type = 'photo';
      data.push(d.photos[i]);
    }
  }

  var remainder = data.length % 6;

  //fill the rest with blank assets
  if(remainder != 0){
    var emptyObject = {
      name: '',
      path: 'blank-path',
      type: 'blank-type'
    };
    for(var i = 0; i < 6 - remainder; i++){
      data.push(emptyObject);
    }
  }

  return data;
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

  // else if(store.getState().current.currentTag == 'ap1' || store.getState().current.currentTag == 'ap2'){
  //   if(store.getState().current.currentUnit == 'PHA' || store.getState().current.currentUnit == 'PHB'){
  //     unitId = store.get
  //   }

  return unitId;
}

//takes the Unit ID or the mediagroup as input and returns the lighting ID
export function getLightingId(val){
  var dataset = {};
  var led_id = 0;
  console.log('getting led_id for val: ' + val);

  if(val === 'Amenities'){
    // dataset = media;
    led_id = 7;
  }else if(val === 'PHA' || val === 'PHB'){
    led_id = 6;
  }else{
    dataset = residence;
    try{
      Object.keys(dataset).map(function(key, index){
        if(dataset[key].name == val){
          led_id = dataset[key].led_id;
        }
      })
    }catch(err){
      console.log('error finding led_id');
    }
  }

  console.log('returning led_id: ' + led_id);

  return led_id;
}


//finds the val (Unit ID or Media Group) in the residence data, returns that Unit's asset list
export function getAssets(data, val){
  var unitData = {};

  try{
    Object.keys(data).map(function(key, index){
      if(data[key].name == val){
        unitData = data[key];
      }
    });
  }catch(err){
    console.log('errrrerrrerer');
  }

  return unitData;
}

//make sure the unit exists, if user is typing it in
export function checkUnitExists(d, unit){
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

  try{
    Object.keys(d).map(function(key, index){
      if(d[key].name == unit){
        found = true;
      }
    });
  }catch(err){
    console.log('unit exists errrr');
  }
  // console.log('Unit Found: ' + found);
  return found;
}

//check that the object has assets inside it
export function checkIfEmpty(obj){
  try{
    return Object.keys(obj).length === 0;
  }catch(e){
    return true;
  }
  return false;
}
