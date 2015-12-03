import * as types from './actionTypes';

export function prevWeek(){
  return (dispatch, getState) => {
    const state = getState();
    let week = state.dashboard.week;

    dispatch(() => {
      type: types.DASHBOARD_PREV_WEEK
    });

    if(week > 0){
      week--;
    }

    dispatch(setWeek(week));
  }
}

export function nextWeek(){
  return (dispatch, getState) => {
    const state = getState();
    let week = state.dashboard.week;

    dispatch(() => {
      type: types.DASHBOARD_NEXT_WEEK
    });

    if(state.dashboard.week < state.plan.data.weeks.length - 1){
        week++;
    }

    dispatch(setWeek(week));
  }
}

export function setWeek(week){
  return {
    type: types.DASHBOARD_SET_WEEK,
    week: week
  };
}

export function initWeek(week){
  return (dispatch, getState) => {
    const state = getState();
    let week = 0

    dispatch(() => {
      type: types.DASHBOARD_INIT_WEEK
    });

    if(state && state.plan && state.plan.data && state.plan.data.currentWeek){
      week = state.plan.data.currentWeek;
    }

    dispatch(setWeek(week));
  };
}
