import * as types from '../actions/actionTypes';

const initialState = {};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case types.APP_ERROR:
      return {
        ...state
      };
    default:
      return state;
  };
}
