import * as types from './types';
import initialState from './initialState';

export function current(state=initialState.current, action){
  switch(action.type){

    case 'UPDATE_CURRENT_TAG':

      return Object.assign({}, state, {
        ['currentTag'] : action.tagName
      })

      case 'UPDATE_CURRENT_UNIT':

        return Object.assign({}, state, {
          ['currentUnit'] : action.unit
      })

    default:
      return state;
  }
}
