import * as types from './action_types';

export function setWeek(week) {
  return {
    type: types.DASHBOARD_SET_WEEK,
    week: week
  };
}

export function prevWeek() {
  return (dispatch, getState) => {
    const state = getState();
    let week = state.dashboard.week;

    dispatch({ type: types.DASHBOARD_PREV_WEEK });

    if (week > 0) {
      week--;
    }

    dispatch(setWeek(week));
  };
}

export function nextWeek() {
  return (dispatch, getState) => {
    const state = getState();
    let week = state.dashboard.week;

    dispatch({ type: types.DASHBOARD_NEXT_WEEK });

    if (state.dashboard.week < state.plan.data.weeks.length - 1) {
      week++;
    }

    dispatch(setWeek(week));
  };
}

export function initWeek(week = 0) {
  return (dispatch, getState) => {
    const state = getState();
    let currentWeek = week;

    dispatch({ type: types.DASHBOARD_INIT_WEEK });

    if (state && state.plan && state.plan.data && state.plan.data.currentWeek) {
      currentWeek = state.plan.data.currentWeek;
    }

    dispatch(setWeek(currentWeek));
  };
}
