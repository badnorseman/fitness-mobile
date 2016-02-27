import React, { Component } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import Main from './Main';

const logger = createLogger();

let createStoreWithMiddleware;

if (__DEV__) {
  createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
}

const store = createStoreWithMiddleware(reducers);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
