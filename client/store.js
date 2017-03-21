import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers/index';

//import sample data
import data from './data/data';
// import comments from './data/comments';
// import posts from './data/posts';

//create an object for the default data
// const defaultState = {
//   data: data,
//   ap1: false
// }

// Middlewares
const middlewares = [thunkMiddleware];
// Create logger
const logger = createLogger();
middlewares.push(logger);

//compose is imported from react-redux
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, enhancers, applyMiddleware(...middlewares));
// const store = createStore(rootReducer, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

//HMR
if(module.hot){
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
