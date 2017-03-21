import * as types from './types';
import initialState from './initialState';

export function folio(state=initialState.folio, action){
  var tag = '';
  var unit = '';

  switch(action.type){
    case 'ASSIGN_TO_FOLIO':
      // console.log('add to folio');
      tag = action.tagName;
      unit = action.unit;

      return Object.assign({}, state, {
        [tag]: unit
      });

    case 'REMOVE_FROM_FOLIO':
      tag = action.tagName;
      unit = 'empty';

      return Object.assign({}, state, {
        [tag]: unit
      })

    case 'ASSIGN_UNIT_TO_TOKEN':
      return Object.assign({}, state, {
        [action.tagName]: action.unit
      })

      case 'REMOVE_UNIT_FROM_TOKEN':
        return Object.assign({}, state, {
          [action.tagName]: action.unit
        })

    default:
      return state;
  }
}
