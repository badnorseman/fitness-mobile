import { Alert } from 'react-native'
import * as actionTypes from '../constants/action_types'

export const alert = (title, message) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.ALERT })

    Alert.alert(title, message)
  }
}

export const appError = (error) => {
  return {
    type: actionTypes.APP_ERROR,
    error
  }
}

export const appReceive = (json, successAction, failAction, data) => {
  switch (json.ok) {
    case true:
      return {
        type: successAction,
        response: json,
        ...data
      }
    case false:
    default:
      return {
        type: failAction,
        response: json,
        ...data
      }
  }
}
