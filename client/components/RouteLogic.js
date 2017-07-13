import * as types from '../reducers/types';
import store from '../store';
import { updateCurrentUnit, updateCurrentTag } from '../actions/actionCreators';
import { sendCommand, compareMode } from './MessageHandler';

export function handleNewTag(tag){
  var path = '';
  switch(tag){
    case 'ap1':
    case 'ap2':
      // console.log(`handleNewTag ${tag}`);
      var ap1Unit = store.getState().folio['ap1'];
      var ap2Unit = store.getState().folio['ap2'];
      var bothTagsActive = checkBothActive();

      if(bothTagsActive){
        console.log(`both tags: ${bothTagsActive}`);
        // var message = compareMode;
        // message.params.unit1 = 'ap1Unit';
        // message.params.unit2 = 'ap2Unit';
        //
        // sendCommand(message);
        path = handleBothActive(ap1Unit, ap2Unit);
        //path = handleBothActive(bothTagsActive[0], bothTagsActive[1]);
      }else if(!bothTagsActive){
        path = handleOneTagActive(ap1Unit, ap2Unit);
      }
      break;
    case 'am':
      path = '/assets/' + 'am';
      break;
    case 'n':
      path = '/assets/' + 'n';
      break;
    case 'PHA':
      path = '/assets/' + 'PHA';
      break;
    case 'PHB':
      path = '/assets/' + 'PHB';
      break;
    case 't':
      path = '/assets/' + 't';
      break;
  }
  // console.log(`path: ${path}`);
  return path;
}

export function handleTagRemoved(callback){
  // console.log(`handle tag removed`);
  var tags = store.getState().tags;
  var isTagActive = Object.keys(tags).filter(function(key){
    return tags[key] == 'true';
  }, this);

  var path = '';

  if(isTagActive.length > 0){
    var lastTag = isTagActive[isTagActive.length - 1];

    console.log('a tag is still active: ' + lastTag);
    updateCurrentTag(lastTag);
    path = handleNewTag(lastTag);
    // console.log(path);
  }else{
    //if there is no tag on table, go to home path
    // console.log('no tags active, going to home');
    path = '/';
    updateCurrentTag('');
    updateCurrentUnit('');
    callback();
  }
  return path;
}

export function checkTagsLeft(){
  var tags = store.getState().tags;
  var isTagActive = Object.keys(tags).filter(function(key){
    return tags[key] === 'true';
  }, this);

  console.log(isTagActive);
  if(isTagActive > 0){
    //do nothing
    return false;
  }else{
    return true;
  }
}

export function checkBothActive(){
  // console.log(`check both tags active`);
  var bothAlive = false;

  var isAp1 = store.getState().tags['ap1'];
  var isAp2 = store.getState().tags['ap2'];

  if(isAp1 === 'true' && isAp2 === 'true'){
    bothAlive = true;
  }else{
    bothAlive = false;
  }
  // console.log(`bothAlive: ${bothAlive}`);

  return bothAlive;
}

export function handleBothActive(ap1Unit, ap2Unit){
  console.log(`handle both tags active`);
  var tag = store.getState().current.currentTag;

  var path = '';

  if(ap1Unit != '' && ap2Unit != ''){
    console.log(`ap1 and ap2 both have units`);
    path = '/compare-units/' + ap1Unit + '+' + ap2Unit;
  }else if(tag === 'ap1' && ap1Unit === ''){
    console.log(`ap1 has a unit but ap2 does not`);
    path = '/ap1';
  }else if(tag === 'ap2' && ap2Unit === ''){
    console.log(`ap2 has a unit but ap1 does not`);
    path = '/ap2';
  }else{
    console.log(`defaulting to currentTag`);
    // path = this.props.current.currentTag;
    path = tag;
  }
  console.log(`path: ${path}`);
  return path;
}

function handleOneTagActive(ap1Unit, ap2Unit){
  var tag = store.getState().current.currentTag;
  var path = '';

  if(tag === 'ap1'){
    if(ap1Unit != ''){
      updateCurrentUnit(ap1Unit);
      path = '/assets/' + ap1Unit;
    }else{
      path = path + 'ap1';
    }
  }
  if(tag === 'ap2'){
    if(ap2Unit != ''){
      updateCurrentUnit(ap2Unit);
      path = '/assets/' + ap2Unit;
    }else{
      path = path + 'ap2';
    }
  }
  return path;
}

export function checkCompareMode(){
  var ap1Unit = store.getState().folio['ap1'];
  console.log(ap1Unit);
  var ap2Unit = store.getState().folio['ap2'];
  console.log(ap2Unit);
  if(ap1Unit != '' && ap2Unit != ''){
    return [ap1Unit, ap2Unit];
  }else{
    return false;
  }
}
