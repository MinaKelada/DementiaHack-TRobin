import {render} from 'react-dom';
import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import {Router, Route, Link, hashHistory, IndexRoute} from 'react-router';
import Calendar from './dist/components/Calendar';
import SearchMap from './dist/components/SearchMap';
import Home from './dist/components/Home';
import Main from './dist/components/Main';
import TaskView from './dist/components/TaskView';



render((
<Router history={hashHistory}>
  <Route path="/" component={Main}>
    <IndexRoute component={Home}/>
    <Route path="searchMap" component={SearchMap}/>
    <Route path="calendar" component={Calendar}/>
    <Route path="taskView" component={TaskView}/>
  </Route>
</Router>
),document.getElementById('app'));
