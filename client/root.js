import React from 'react';
import { render } from 'react-dom';

import css from './styles/style.styl';
import App from './components/App';
import Home from './components/Home';
import Assets from './components/Assets';
import CompareUnits from './components/CompareUnits'
import Grid from './components/Grid'
import Keypad from './components/Keypad'

//include raven/sentry stuff here

import { Router, Route, IndexRoute, browserHistory as reactRouterBrowserHistory } from 'react-router';
import {Provider } from 'react-redux';
import * as browserHistory from './components/History';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    {/* <Router history={history}> */}
    <Router history={reactRouterBrowserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path='/ap1' component={Keypad}></Route>
        <Route path='/ap2' component={Keypad}></Route>
        <Route path='/am' component={Assets}></Route>
        <Route path='/n' component={Assets}></Route>
        <Route path='/PHA' component={Assets}></Route>
        <Route path='/PHB' component={Assets}></Route>
        <Route path='/t' component={Assets}></Route>
        <Route path='/grid' component={Grid}></Route>
        <Route path='/keypad' component={Keypad}></Route>
        <Route path='/assets/:unitId' component={Assets}></Route>
        <Route path='/compare-units/:compareUnitsId' component={CompareUnits}></Route>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
