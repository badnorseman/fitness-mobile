import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
const logger = createLogger();

import * as reducers from '../reducers';
import Layout from './Layout';
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
        <Layout />
      </Provider>
    );
  }
}
