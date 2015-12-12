import * as types from './action_types';

export function request(apiRequest) {
  return (dispatch) => {
    dispatch({
      type: types.NETWORK_REQUEST
    });

    return apiRequest
      .then((response) => {
        dispatch({
          type: types.NETWORK_REQUEST_COMPLETED,
          response: response
        });

        return response;
      });
  };
}
