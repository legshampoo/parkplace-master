import * as types from './types';
import initialState from './initialState';

export function assets(state=initialState.residences, action){
  switch(action.type){
    case 'UPDATE_RESIDENCE_ASSETS':

      return Object.assign({}, state, {
        ['residences']: action.data,
      });
    case 'UPDATE_MEDIA_ASSETS':

      return Object.assign({}, state, {
        ['media']: action.data,
      });

    default:
      return state;
  }
}
