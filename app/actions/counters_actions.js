import * as actionTypes from '../constants/action_types';
import { COUNT_UP, COUNT_DOWN } from '../constants/counter_directions';

export function stopCounter(counterKey) {
  return {
    type: actionTypes.COUNTERS_STOP,
    counterKey: counterKey
  };
}

function tick(counterKey, attempt = 1) {
  return (dispatch, getState) => {
    const state = getState();
    const counter = state.counters[counterKey];
    let shouldCounterTick = false;

    if (!counter) {
      if (attempt < 20) {
        return setTimeout(() => {
          dispatch(tick(counterKey, attempt + 1));
        }, 10);
      }

      return false;
    }

    if (counter.direction === COUNT_UP) {
      shouldCounterTick = counter.active && counter.count < counter.limit;
    } else if (counter.direction === COUNT_DOWN) {
      shouldCounterTick = counter.active && counter.count > counter.limit;
    }

    if (shouldCounterTick) {
      dispatch({
        type: actionTypes.COUNTERS_TICK,
        counterKey: counterKey
      });

      setTimeout(() => {
        dispatch(tick(counterKey));
      }, 1000);
    } else {
      dispatch(stopCounter(counterKey));
    }
  };
}

export function startCounter(counterKey, limit = 0, direction = COUNT_DOWN, startFrom = 180) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.COUNTERS_START,
      counterKey: counterKey,
      limit: limit,
      direction: direction,
      startFrom: startFrom,
      count: startFrom
    });

    dispatch(tick(counterKey));
  };
}

export function resumeCounter(counterKey) {
  return {
    type: actionTypes.COUNTERS_RESUME,
    counterKey: counterKey
  };
}

export function resetCounter(counterKey) {
  return {
    type: actionTypes.COUNTERS_RESET,
    counterKey: counterKey
  };
}
