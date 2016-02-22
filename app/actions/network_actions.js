import * as actionTypes from './action_types';

export function request(apiRequest) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.NETWORK_REQUEST
    });

    return apiRequest
      .then((response) => {
        dispatch({
          type: actionTypes.NETWORK_REQUEST_COMPLETED,
          response: response
        });

        return response;
      });
  };
}
