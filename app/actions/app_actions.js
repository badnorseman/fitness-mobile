import { Alert } from 'react-native';
import * as actionTypes from '../constants/action_types';

const alert = (title, message) => (dispatch) => {
  dispatch({ type: actionTypes.ALERT });

  Alert.alert(title, message);
};

const appError = (error) => ({
  type: actionTypes.APP_ERROR,
  error
});

const appReceive = (json, successAction, failAction, params) => {
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
};

export { alert, appError, appReceive };
