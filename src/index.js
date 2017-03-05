import {render} from 'react-dom';
import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import {Router, Route, Link, hashHistory, IndexRoute} from 'react-router';
import Calendar from './dist/components/Calendar';
import SearchMap from './dist/components/SearchMap';
import Home from './dist/components/Home';
import Main from './dist/components/Main';



render((
<Router history={hashHistory}>
  <Route path="/" component={Main}>
    <IndexRoute component={Home}/>
    <Route path="searchMap" component={SearchMap}/>
    <Route path="calendar" component={Calendar}/>
  </Route>
</Router>
),document.getElementById('app'));
