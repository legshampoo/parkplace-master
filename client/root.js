import React from 'react';
import { render } from 'react-dom'; //renders to html

import css from './styles/style.styl';
import App from './components/App';
import Home from './components/Home';
// import Ap1 from './components/Ap1';
// import Ap2 from './components/Ap2'
import MediaGroup from './components/MediaGroup'
// import N from './components/N'
// import P1 from './components/P1'
// import P2 from './components/P2'
// import T from './components/T'
import UnitDetails from './components/UnitDetails'
import CompareUnits from './components/CompareUnits'
// import DevMenu from './components/DevMenu'
import Grid from './components/Grid'
import Keypad from './components/Keypad'

//include raven/sentry stuff here

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import {Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path='/ap1' component={Keypad}></Route>
        <Route path='/ap2' component={Keypad}></Route>
        <Route path='/am' component={MediaGroup}></Route>
        <Route path='/n' component={MediaGroup}></Route>
        <Route path='/p1' component={UnitDetails}></Route>
        <Route path='/p2' component={UnitDetails}></Route>
        <Route path='/t' component={MediaGroup}></Route>
        <Route path='/a' component={MediaGroup}></Route>
        <Route path='/grid' component={Grid}></Route>
        <Route path='/keypad' component={Keypad}></Route>
        <Route path='/unit-details/:unitId' component={UnitDetails}></Route>
        <Route path='/compare-units/:compareUnitsId' component={CompareUnits}></Route>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
