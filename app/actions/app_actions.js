import { Alert } from 'react-native';
import * as actionTypes from '../constants/action_types';

export function alert(title, message) {
  return (dispatch) => {
    dispatch({ type: actionTypes.ALERT });

    Alert.alert(title, message);
  };
}

export function appError(error) {
  return {
    type: actionTypes.APP_ERROR,
    error
  };
}

export function appReceive(json, successAction, failAction, params) {
  switch (json.ok) {
    case true:
      return {
        type: successAction,
        response: json,
        ...params
      };
    case false:
    default:
      return {
        type: failAction,
        response: json,
        ...params
      };
  }
}
