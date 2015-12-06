import * as types from '../actions/action_types';

const initialState = {};

export default function network(state = initialState, action = {}) {
  switch (action.type) {
    case types.NETWORK_REQUEST:
      state[action.id] = Date.now();
      return state;
    case types.NETWORK_REQUEST_COMPLETED:
      delete state[action.id];
      return state;
    default:
      return state;
  }
}
