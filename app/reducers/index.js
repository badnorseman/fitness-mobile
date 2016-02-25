'use strict';
import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import plan from './plan';
import habit from './habit';
import dashboard from './dashboard';
import network from './network';
import counters from './counters';

const reducers = combineReducers({
  app,
  auth,
  plan,
  habit,
  dashboard,
  network,
  counters
});

export default reducers
