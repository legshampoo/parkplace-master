import store from '../store';

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
      type: 'blank'
    };
    for(var i = 0; i < 6 - remainder; i++){
      data.push(emptyObject);
    }
  }

  return data;
}



//finds the unit ID stored in the current state
export function getUnitId(){
  var unitId = '';

  if(store.getState().current.currentTag == 'PHA' || store.getState().current.currentTag == 'PHB'){
    unitId = store.getState().current.currentTag;
    if(unitId == 'PHA' || unitId == 'PHB'){
      unitId = unitId.slice(0, 2) + " " + unitId.slice(2);
    }
  }else{
    unitId = store.getState().current.currentUnit;
  }

  return unitId;
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

  try{
    Object.keys(d).map(function(key, index){
      if(d[key].name == unit){
        found = true;
      }
    });
  }catch(err){
    console.log('unit exists errrr');
  }

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
