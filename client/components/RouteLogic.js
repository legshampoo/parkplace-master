import * as types from '../reducers/types';
import store from '../store';
import { updateCurrentUnit, updateCurrentTag } from '../actions/actionCreators';


export function handleNewTag(tag){
  // console.log(tag);
  var path = '';
  switch(tag){
    case 'ap1':
    case 'ap2':
      var ap1Unit = store.getState().folio['ap1'];
      var ap2Unit = store.getState().folio['ap2'];
      var bothTagsActive = checkBothActive();
      // console.log(bothTagsActive);
      if(bothTagsActive){
        console.log('both');
        path = handleBothActive(ap1Unit, ap2Unit);
        console.log(path);
      }else if(!bothTagsActive){
        path = handleOneTagActive(ap1Unit, ap2Unit);
        // console.log(path);
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

  // console.log(path);
  return path;
}

export function handleTagRemoved(){
  // console.log('start');
  var tags = store.getState().tags;
  // console.log(tags);
  var isTagActive = Object.keys(tags).filter(function(key){
    return tags[key] == true;
  }, this);
  // console.log(isTagActive);
  var path = '';
  // console.log(path);
  if(isTagActive.length > 0){
    var lastTag = isTagActive[isTagActive.length - 1];
    // updateCurrentTag(lastTag);

    console.log('a tag is still active: ' + lastTag);
    updateCurrentTag(lastTag);
    path = handleNewTag(lastTag);
    console.log(path);
  }else{
    //if there is no tag on table, go to home path
    // console.log('no tags active, going to home');
    path = '/';
    updateCurrentTag('');
    updateCurrentUnit('');
    // console.log(path);
  }
  // console.log(path);
  return path;
}

function checkBothActive(){
  var bothAlive = false;

  var isAp1 = store.getState().tags['ap1'];
  var isAp2 = store.getState().tags['ap2'];

  if(isAp1 === 'true' && isAp2 === 'true'){
    bothAlive = true;
  }else{
    bothAlive = false;
  }

  return bothAlive;
}

function test(){
  console.log('test');
}

function handleBothActive(ap1Unit, ap2Unit){
  var tag = store.getState().current.currentTag;
  var path = '';
  console.log('1');
  if(ap1Unit != '' && ap2Unit != ''){
    path = '/compare-units/' + ap1Unit + '+' + ap2Unit;
  }
  if(tag == 'ap1' && ap1Unit == ''){
    path = '/ap1';
  }
  if(tag == 'ap2' && ap2Unit == ''){
    path = '/ap2';
  }

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
