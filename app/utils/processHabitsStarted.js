/*
 * Ported from:
 * fitbird-spa / src / main / webapp / app / services / habitService.js
 * Commit: 5135bf5
 *
 * Modified to not depend on a global variable
 * Modified to use getWeek as a module rather than a modified prototype method
 */

import getWeek from './getWeek';

function getOrCreateYearInHabitsStarted(habitsStarted, year) {
  let yearMap = habitsStarted[year.toString()];

  if (!yearMap) {
    yearMap = {};
    habitsStarted[year.toString()] = yearMap;
  }
  return yearMap;
}

function getOrCreateWeekInHabitsStarted(yearMap, week, uh) {
  let weekMap = yearMap[week.toString()];
  if (!weekMap) {
    weekMap = { userHabit: uh, days: [] };
    yearMap[week.toString()] = weekMap;
  }
  return weekMap;
}

function setTimeStatusOfOcurence(o, oYear) {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayWeek = getWeek(today);
  const todayWeekDay = today.getDay();

  if (oYear < todayYear
      || oYear === todayYear && o.week < todayWeek
      || oYear === todayYear && o.week === todayWeek && o.day % 7 < todayWeekDay) {
    o.timeStatus = 'past';
  } else if (oYear === todayYear && o.week === todayWeek && o.day % 7 === todayWeekDay) {
    o.timeStatus = 'today';
  } else {
    o.timeStatus = 'future';
  }
}

function processHabitStarted(habitsStarted, uh) {
  // Used as addition when each occurence is checked
  uh.compliancePerOccurence = 100.0 / uh.occurences.length;
  uh.compliance = 0;

  const uhCreatedDT = new Date(uh.createdDT);
  let year = uhCreatedDT.getFullYear();
  for (let j = 0; j < uh.occurences.length; j++) {
    const o = uh.occurences[j];
    if (o.dateDT) {
      uh.compliance += uh.compliancePerOccurence;
    }

    const yearMap = getOrCreateYearInHabitsStarted(habitsStarted, year.toString());
    const weekMap = getOrCreateWeekInHabitsStarted(yearMap, o.week, uh);
    setTimeStatusOfOcurence(o, year);
    weekMap.days.push(o);

    // If it's last day of the last week of the year, go to next year
    if (o.week === 52 && j % 7 === 6) {
      year++;
    }
  }
}

/**
  * Transforms downloaded UserHabits into usable Map<year<Map<weekNo, List.UserHabitOccurence>> and adds .habit into each weekNo, for easier dashboard display.
  *
  * @param {List.UserHabit} data
  * @returns nothing
  */
export default function processHabitsStarted(json) {
  const habitsStarted = {};

  for (let i = 0; i < json.data.length; i++) {
    processHabitStarted(habitsStarted, json.data[i]);
  }

  json.habitsStarted = habitsStarted;

  return json;
}
