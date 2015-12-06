import { AlertIOS } from 'react-native';
import * as types from './action_types';

export function appError(error) {
  return {
    type: types.APP_ERROR,
    error: error
  };
}

export function appReceive(json, successAction, failAction) {
  switch (json.ok) {
    case true:
      return {
        type: successAction,
        response: json
      };
    case false:
    default:
      return {
        type: failAction,
        response: json
      };
  }
}

export function alert(title, message) {
  return (dispatch) => {
    dispatch(() => {
      return {
        type: types.ALERT
      };
    });

    AlertIOS.alert(title, message);
  };
}
