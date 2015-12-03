/*
 * Based on some code found in:
 * fitbird-spa / src / main / webapp / app / workout / WorkoutGroupController.js
 * Commit: 5135bf5
 *
 * Changed to not mess with Date.prototype, and not declare a nested
 * named function.
 */

import prepareColumns from './prepareColumns';

function getExercise(exerciseGroup, exId) {
  for (var i = 0; i < exerciseGroup.exercises.length; i++) {
    if (exerciseGroup.exercises[i].id === exId) {
      return exerciseGroup.exercises[i];
    }
  }
}

export default function processExerciseGroup(exerciseGroup){
  if (!exerciseGroup.sets[0].ex) {
    // prepare columns for output
    // put Exercise into each set as ['ex'] for easier output
    for (var i = 0; i < exerciseGroup.sets.length; i++) {
      exerciseGroup.sets[i].ex = getExercise(exerciseGroup, exerciseGroup.sets[i].exerciseId);
      // Needs to be called after 'ex' is set
      exerciseGroup.sets[i] = prepareColumns(exerciseGroup.sets[i]);
    }
  }

  return exerciseGroup;
}
