import * as actionTypes from '../constants/action_types';

// Change `request to networkRequest`
const request = (apiCall) => (dispatch) => {
  dispatch({ type: actionTypes.NETWORK_REQUEST });

  return apiCall
    .then((response) => {
      dispatch({
        type: actionTypes.NETWORK_REQUEST_COMPLETED,
        response
      });

      return response;
    });
};

export { request };
