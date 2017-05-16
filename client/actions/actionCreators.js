import * as types from '../reducers/types';
import store from '../store';

export function updateCurrentTag(tagName){

  store.dispatch({
    type: 'UPDATE_CURRENT_TAG',
    tagName: tagName
  })
}

export function updateCurrentUnit(unit){
  store.dispatch({
    type: 'UPDATE_CURRENT_UNIT',
    unit: unit
  })
}

export function updateTagStatus(tagName, status){
  store.dispatch({
    type: 'UPDATE_TAG_STATUS',
    tagName: tagName,
    status: status
  });
}

export function assignToFolio(tagName, unit){
  store.dispatch({
    type: 'ASSIGN_TO_FOLIO',
    tagName: tagName,
    unit: unit
  });
}

export function removeFromFolio(tagName){
  store.dispatch({
    type: 'REMOVE_FROM_FOLIO',
    tagName: tagName
  });
}

export function assignUnitToToken(tagName, unit){
  store.dispatch({
    type: 'ASSIGN_UNIT_TO_TOKEN',
    tagName: tagName,
    unit: unit
  })
}

export function removeUnitFromToken(tagName, unit){
  store.dispatch({
    type: 'REMOVE_UNIT_FROM_TOKEN',
    tagName: tagName,
    unit
  })
}
