'use strict';
import * as actionTypes from '../constants/action_types';

const request = (apiRequest) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.NETWORK_REQUEST });

    return apiRequest
      .then((response) => {
        dispatch({
          type: actionTypes.NETWORK_REQUEST_COMPLETED,
          response: response
        });

        return response;
      });
  };
};

export { request };
