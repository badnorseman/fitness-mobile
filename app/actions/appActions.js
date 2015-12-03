import { AlertIOS } from 'react-native';
import * as types from './actionTypes';

export function appError(error){
  return {
    type: types.APP_ERROR
  };
}

export function appReceive(json, successAction, failAction) {
  switch(json.ok){
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
      break;
  }
}

export function alert(title, message){
  return (dispatch, getState) => {
    dispatch(() => {
      type: types.ALERT
    });

    AlertIOS.alert(title, message);
  };
}
