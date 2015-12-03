/*
 * Ported from:
 * fitbird-spa / src / main / webapp / app / services / exSetService.js
 * Commit: 5135bf5
 *
 * Changed to not mess with Date.prototype, and not declare a nested
 * named function.
 */

import prettifySeconds from './prettifySeconds';

export default function prepareColumns(exSet) {
  const c1 = 'c1';
  const c1t = 'c1t';
  const c1Missing = 'c1Missing';
  const c1FieldName = 'c1FieldName';
  const c2 = 'c2';
  const c2t = 'c2t';
  const c2Missing = 'c2Missing';
  const c2FieldName = 'c2FieldName';

  if (exSet.rest) {
    exSet.restPretty = exSet.dateDT ? '00:00' : prettifySeconds(exSet.rest);
  }

  switch (exSet.exerciseType) {
    case 'DURATION_DISTANCE':
      exSet[c1] = exSet.distance;
      exSet[c1t] = 'm';
      exSet[c1FieldName] = 'distance';
      exSet[c2] = prettifySeconds(exSet.duration);
      exSet[c2t] = '';
      exSet[c2FieldName] = 'duration';
      break;
    case 'DURATION_REPS':
      exSet[c1] = exSet.repetitions;
      exSet[c1t] = 'reps';
      exSet[c1FieldName] = 'repetitions';
      exSet[c2] = prettifySeconds(exSet.duration);
      exSet[c2t] = '';
      exSet[c2FieldName] = 'duration';
      break;
    case 'DURATION':
      exSet[c1] = prettifySeconds(exSet.duration);
      exSet[c1t] = '';
      exSet[c1FieldName] = 'duration';
      exSet[c2] = '';
      exSet[c2t] = '';
      exSet[c2FieldName] = '';
      break;
    case 'REPS':
      exSet[c1] = exSet.repetitions;
      exSet[c1t] = 'reps';
      exSet[c1FieldName] = 'repetitions';
      exSet[c2] = '';
      exSet[c2t] = '';
      exSet[c2FieldName] = '';
      break;
    case 'LOAD_REPS':
    case 'LOAD_REPS_TEST':
      exSet[c1] = exSet.repetitions;
      exSet[c1t] = 'reps';
      exSet[c1FieldName] = 'repetitions';
      exSet[c2] = exSet.load;
      exSet[c2t] = 'kg';
      exSet[c2FieldName] = 'load';
      break;
    case 'LOAD_DISTANCE':
      exSet[c1] = exSet.distance;
      exSet[c1t] = 'm';
      exSet[c1FieldName] = 'distance';
      exSet[c2] = exSet.load;
      exSet[c2t] = 'kg';
      exSet[c2FieldName] = 'load';
      break;
  }

  // There can be no exercise set if called from ExerciseHistoryController
  if (exSet.ex) {
    if (exSet.ex.uniExecution) {
      exSet[c1t] = exSet[c1t] + '/side';
    }
    if (exSet.ex.uniLoading && exSet[c2t]) {
      exSet[c2t] = exSet[c2t] + '/side';
    }
  }

  if (exSet.missingField) {
    exSet[c1Missing] = true;

    switch (exSet.exerciseType) {
      case 'DURATION_DISTANCE':
        if (exSet.missingField === 'duration') {
          exSet[c1Missing] = false;
          exSet[c2Missing] = true;
        }
        break;
      case 'DURATION_REPS':
        if (exSet.missingField === 'duration') {
          exSet[c1Missing] = false;
          exSet[c2Missing] = true;
        }
        break;
      case 'DURATION':
        break;
      case 'REPS':
        break;
      case 'LOAD_REPS':
      case 'LOAD_REPS_TEST':
        if (exSet.missingField === 'load') {
          exSet[c1Missing] = false;
          exSet[c2Missing] = true;
        }
        break;
      case 'LOAD_DISTANCE':
        if (exSet.missingField === 'load') {
          exSet[c1Missing] = false;
          exSet[c2Missing] = true;
        }
        break;
    }
  }

  return exSet;
}
