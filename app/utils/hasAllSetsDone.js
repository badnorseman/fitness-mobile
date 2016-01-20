/*
 * Ported from:
 * fitbird-spa / src / main / webapp / app / services / planService.js
 * Commit: 5135bf5
 */

function hasAllSetsDoneHelper(sets, exId) {
  for (let i = 0; i < sets.length; i++) {
    const set = sets[i];
    if (!set.warmup && set.exerciseId === exId && !set.dateDT) {
      return false;
    }
  }
  return true;
}

export default function hasAllSetsDone(eg) {
  for (let i = 0; i < eg.exercises.length; i++) {
    if (!hasAllSetsDoneHelper(eg.sets, eg.exercises[i].id)) {
      return false;
    }
  }
  return true;
}
