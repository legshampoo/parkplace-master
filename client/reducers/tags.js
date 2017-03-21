import * as types from './types';
import initialState from './initialState';

export function tags(state=initialState.tags, action){
  switch(action.type){
    case 'UPDATE_TAG_STATUS':

      // const tag = action.tagName;

      return Object.assign({}, state, {
        [action.tagName]: action.status,
      });

    default:
      return state;
  }
}
