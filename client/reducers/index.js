//combines into one store

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { tags } from './tags';
import { folio } from './folio';
import { current } from './current';

const rootReducer = combineReducers({tags, folio, current, routing: routerReducer});

export default rootReducer;
