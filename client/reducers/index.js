//combines into one store

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import data from './data';
// import ap1 from './ap1';
// import { counter } from './counter';
import { tags } from './tags';
import { folio } from './folio';
import { current } from './current';
// import posts from './posts';
// import comments from './comments';

// const rootReducer = combineReducers({posts, comments, routing: routerReducer});
const rootReducer = combineReducers({tags, folio, current, routing: routerReducer});

export default rootReducer;
