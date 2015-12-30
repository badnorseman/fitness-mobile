/*
 * Ported from:
 * fitbird-spa / src / main / webapp / app / services / habitService.js
 * Commit: 5135bf5
 *
 * Added some logic from fitbird-spa / src / main / webapp / app / dashboard / DashboardWeekController.js
 * Modified to use getWeek as a module
 */

import getWeek from './getWeek';

export default function getHabitStartedOccurences(habitsStarted, year, week) {
  let habitWeek;

  if (habitsStarted[year.toString()]) {
    habitWeek = habitsStarted[year.toString()][week.weekNo.toString()];
  }

  // Lines 22 - 25 from DashboardWeekController.js
  if (!habitWeek && getWeek(new Date()) === week.weekNo) {
    habitWeek = { days: [{}] };
    habitWeek.days[0].pick = true;
  }

  return habitWeek;
}
