import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import counter from './counter';
import dashboard from './dashboard';
import habit from './habit';
import network from './network';
import workout from './workout';

const reducers = combineReducers({
  app,
  auth,
  dashboard,
  habit,
  network,
  counter,
  workout
});

export default reducers;
