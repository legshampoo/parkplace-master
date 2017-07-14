import store from '../store';

export function combineAssets(d, type){
  var data = [];

  //the unit type determines how far down the tree to go
  if(type === 'Unit'){
    data = d.media;

    for(var i = 0; i < data.length; i++){
      if(data[i].type == 'Animation'){
        data[i].assetType = 'video';
      }else{
        data[i].assetType = 'photo';
      }
      // data[i].type = 'photo';  //ORIGINAL
    }
  }else{
    //consolidate non unit photos and videos into one array
    //photos first, then animations
    for(var i = 0; i < d.photos.length; i++){
      // d.photos[i].type = 'photo';  //ORIGINAL
      // console.log(`photo: ${i}`);
      d.photos[i].assetType = 'photo';
      data.push(d.photos[i]);
    }
    for(var i = 0; i < d.videos.length; i++){
      // d.videos[i].type = 'video';  //ORIGINAL
      // console.log(`video: ${i}`);
      d.videos[i].assetType = 'video';
      data.push(d.videos[i]);
    }
  }

  var remainder = data.length % 6;

  //fill the rest with blank assets
  if(remainder != 0){
    var emptyObject = {
      name: '',
      path: 'blank-path',
      type: 'blank-type',  //remove this when done
      assetType: 'blank-type'
    };
    for(var i = 0; i < 6 - remainder; i++){
      // console.log(`empty asset: ${i}`);
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
    // if(unitId == 'PHA' || unitId == 'PHB'){
    //   unitId = unitId.slice(0, 2) + " " + unitId.slice(2);
    // }
  }else if(store.getState().current.currentTag === 'ap1'){
    unitId = store.getState().folio.ap1;
  }else if(store.getState().current.currentTag === 'ap2'){
    unitId = store.getState().folio.ap2;
  }

  if(unitId == 'PHA' || unitId == 'PHB'){
    unitId = unitId.slice(0, 2) + " " + unitId.slice(2);
  }

    //original
  // }else{
  //   unitId = store.getState().current.currentUnit;
  //   console.log(`unitId in getUnitId: ${unitId}`);
  //   if(unitId == 'PHA' || unitId == 'PHB'){
  //     unitId = unitId.slice(0, 2) + " " + unitId.slice(2);
  //   }
  // }

  return unitId;
}

//takes the Unit ID or the mediagroup as input and returns the lighting ID
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

    dataset = store.getState().assets.residences.data;

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

export function getFloorplan(unit){
  let dataset = store.getState().assets.residences.data;
  var unitInfo = getAssets(dataset, unit);
  var media = unitInfo.media;
  var floorplanURL = '/empty';

  try{
    Object.keys(media).map(function(key, index){
      // console.log(`key: ${key} , val: ${media[key]}`);
      if(media[key].name == 'Floorplan'){
        floorplanURL = media[key].half_screen;
        // console.log(`${unit} floorplan: ${floorplanURL}`);
      }
    })
  }catch(e){
    console.log(e);
  }
  return floorplanURL;
}

export function formatData(data){
  
  var newData = {
    Type: '',
    Bedrooms: '',
    Bathrooms: '',
    hasTerrace: false,
    Interior: '',
    Exterior: '',
    Price: ''
  }

  var interiorDims = '';
  var exteriorDims = '';

  Object.keys(data).map(function(key, index){

    if(key === 'terrace'){
      if(data[key] === false){
        newData.hasTerrace = false;
        return
      }else{
        newData.hasTerrace = true;
        return
      }
    }

    if(key === 'interior_square_feet'){
      var numberFormatted = new Intl.NumberFormat('en', {
        maximumFractionDigits: 0
      }).format(data[key]);
      
      interiorDims = interiorDims + numberFormatted + ' Sq Ft / ';
      newData.Interior = interiorDims;
    }

    if(key === 'interior_square_meters'){
      var numberFormatted = new Intl.NumberFormat('en', {
        maximumFractionDigits: 1
      }).format(data[key]);
      
      interiorDims = interiorDims + numberFormatted + ' Sq M';
      newData.Interior = interiorDims;
    }

    if(!newData.hasTerrace){
      if(key === 'exterior_square_feet' || key === 'exterior_square_meters'){
        return
      }
    }
    
    if(key === 'exterior_square_feet'){
      var numberFormatted = new Intl.NumberFormat('en', {
        maximumFractionDigits: 0
      }).format(data[key]);
      
      exteriorDims = exteriorDims + numberFormatted + ' Sq Ft / ';
      newData.Exterior = exteriorDims;
    }

    if(key === 'exterior_square_meters'){
      var numberFormatted = new Intl.NumberFormat('en', {
        maximumFractionDigits: 1
      }).format(data[key]);
      exteriorDims = exteriorDims + numberFormatted + ' Sq M';
      newData.Exterior = exteriorDims;
    }

    if(key === 'type'){
      newData.Type = data[key];
    }

    if(key === 'price'){
      var formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(data[key]);
      
      newData.Price = formattedPrice;
    }

    if(key === 'bedrooms'){
      newData.Bedrooms = data[key];
    }

    if(key === 'bathrooms'){
      newData.Bathrooms = data[key];
    }

  })

  return newData;
}
