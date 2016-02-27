import * as actionTypes from '../constants/action_types'

// Change `request` to `networkRequest`
// and `apiRequest` to `request`
export const request = (apiRequest) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.NETWORK_REQUEST
    })

    return apiRequest
      .then((response) => {
        dispatch({
          type: actionTypes.NETWORK_REQUEST_COMPLETED,
          response
        })

        return response
      })
  }
}
