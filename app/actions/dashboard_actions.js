import * as actionTypes from '../constants/action_types';

const setWeek = (week) => ({
  type: actionTypes.DASHBOARD_SET_WEEK,
  week
});

const initWeek = (week = 0) => (dispatch, getState) => {
  const state = getState();
  let currentWeek = week;

  dispatch({ type: actionTypes.DASHBOARD_INIT_WEEK });

  if (state && state.plan && state.plan.data && state.plan.data.currentWeek) {
    currentWeek = state.plan.data.currentWeek;
  }

  dispatch(setWeek(currentWeek));
};

const nextWeek = () => (dispatch, getState) => {
  const state = getState();
  let week = state.dashboard.week;

  dispatch({ type: actionTypes.DASHBOARD_NEXT_WEEK });

  if (state.dashboard.week < state.plan.data.weeks.length - 1) {
    week++;
  }

  dispatch(setWeek(week));
};

const prevWeek = () => (dispatch, getState) => {
  const state = getState();
  let week = state.dashboard.week;

  dispatch({ type: actionTypes.DASHBOARD_PREV_WEEK });

  if (week > 0) {
    week--;
  }

  dispatch(setWeek(week));
};

export { initWeek, nextWeek, prevWeek, setWeek };
