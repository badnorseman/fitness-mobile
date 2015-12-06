/*
 * Ported from:
 * fitbird-spa / src / main / webapp / app / services / planService.js
 * Commit: 5135bf5
 *
 * Changed to not mess with Date.prototype, and not declare a nested
 * named function.
 */
import getWeek from './getWeek';
import processExerciseGroup from './processExerciseGroup';
import prepareWorkoutOverview from './prepareWorkoutOverview';
import prepareColumns from './prepareColumns';

function hasSets(sets, exId) {
  let i;

  for (i = 0; i < sets.length; i++) {
    if (sets[i].exerciseId === exId) {
      return true;
    }
  }
  return false;
}

export default function processPlan(plan) {
  let i;
  let j;
  let k;
  let eg;
  let week;
  let todayWeekNo;
  let w;
  let wStartW;
  let weeksPerYear;

  // Remove exercise groups with no sets (could happen if a group is disabled)
  for (i = 0; i < plan.workouts.length; i++) {
    for (j = 0; j < plan.workouts[i].exerciseGroups.length; j++) {
      if (plan.workouts[i].exerciseGroups[j].sets.length === 0) {
        plan.workouts[i].exerciseGroups.splice(j, 1);
        j--;
      }
    }
  }

  // Remove ex with no sets from eg (could happend if a test is present)
  for (i = 0; i < plan.workouts.length; i++) {
    for (j = 0; j < plan.workouts[i].exerciseGroups.length; j++) {
      eg = plan.workouts[i].exerciseGroups[j];

      for (k = 0; k < eg.exercises.length; k++) {
        if (!hasSets(eg.sets, eg.exercises[k].id)) {
          eg.exercises.splice(k, 1);
          k--;
        }
      }
    }
  }

  // get weekNo of first workout if started, or set weekNo of today
  week = { weekNo: {}, workouts: [] };
  week.weekNo = plan.workouts[0].startDT ? getWeek(new Date(plan.workouts[0].startDT))
      : getWeek(new Date());

  todayWeekNo = getWeek(new Date());
  plan.weeks = [];
  plan.weeks.push(week);

  // map workouts to week index and week number
  for (i = 0; i < plan.workouts.length; i++) {
    week = plan.weeks[plan.weeks.length - 1];
    w = plan.workouts[i];
    wStartW = w.startDT ? getWeek(new Date(w.startDT)) : '';

    if (wStartW && wStartW === week.weekNo) {
      week.workouts.push(w);
    } else if (week.weekNo && week.workouts.length < plan.workoutsPerWeek) {
      week.workouts.push(w);
    } else {
      week = { weekNo: {}, workouts: [] };

      if (wStartW) {
        week.weekNo = wStartW;

        // if previous week has a workout done (but it's not current week), and new week doesn't
      } else if (plan.weeks[plan.weeks.length - 1].workouts[0].endDT
          && plan.weeks[plan.weeks.length - 1].weekNo !== todayWeekNo && !wStartW) {
        week.weekNo = todayWeekNo;
      } else {
        weeksPerYear = new Date().getFullYear() % 4 === 0 ? 53 : 52;

        // just increase week no
        week.weekNo = (plan.weeks[plan.weeks.length - 1].weekNo + 1) % weeksPerYear;
        if (week.weekNo === 0) {
          week.weekNo = weeksPerYear;
        }
      }

      plan.weeks.push(week);
      week.workouts.push(w);
    }

    // set in plan what is the current week
    if (week.weekNo === todayWeekNo) {
      plan.currentWeek = plan.weeks.length - 1;
    }
  }

  // If currentWeek wasn't set yet, set it to last week.
  // This can happen if a plan is done
  if (typeof plan.currentWeek === 'undefined') {
    plan.currentWeek = plan.weeks.length - 1;
  }

  for (i = 0; i < plan.workouts.length; i++) {
    for (j = 0; j < plan.workouts[i].exerciseGroups.length; j++) {
      plan.workouts[i].exerciseGroups[j] = processExerciseGroup(plan.workouts[i].exerciseGroups[j]);
    }
  }

  for (i = 0; i < plan.workouts.length; i++) {
    plan.workouts[i].overview = prepareWorkoutOverview(plan.workouts[i]);
  }

  Object.keys(plan.history).forEach((exerciseId) => {
    let exerciseHistory = plan.history[exerciseId];

    for (j = 0; j < exerciseHistory.length; j++) {
      exerciseHistory[j] = prepareColumns(exerciseHistory[j]);
    }

    plan.history[exerciseId] = exerciseHistory;
  });

  return plan;
}
