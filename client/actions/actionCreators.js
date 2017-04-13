import * as types from '../reducers/types';
import store from '../store';

export function updateCurrentTag(tagName){
  // console.log('update current tag');
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
  // console.log('update tag status: ' + tagName);

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

// export function addOneToCounter(value){
//   console.log('add one to counter');
//
//   store.dispatch({
//     type: 'INCREMENT',
//     value: value
//   });
// }

// export function ap1Success(response) {
//   return {
//     type: types.ACTION_SUCCESS,
//     payload: response
//   }
// }

// export function toggleAp1(name){
//   console.log('ap1 action triggered');
//   return dispatch => {
//     /* ajax calls here */
//     let response = {
//       name,
//       email: 'asdfasdf@asdf.com'
//     };
//     dispatch(ap1Success(response));
//   }
//
// }
