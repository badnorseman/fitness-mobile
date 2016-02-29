import React, { Component } from 'react-native';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import Main from './Main';

const logger = createLogger();
let createStoreWithMiddleware;

if (__DEV__) {
  createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
}

const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
