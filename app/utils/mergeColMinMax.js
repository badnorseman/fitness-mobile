/*
 * Ported from:
 * fitbird-spa / src / main / webapp / app / services / planService.js
 * Commit: 5135bf5
 */

import prettifySeconds from './prettifySeconds';

function mergeColMinMaxHelper(exData, col, ending) {
  // Don't do anything if there's no data
  if (!exData[col + 'Min']) {
    return;
  }

  const hasDifferendMinMaxValues = exData[col + 'Min'] !== exData[col + 'Max'];

  // No ending = seconds
  if (!ending) {
    exData[col] = prettifySeconds(exData[col + 'Min']);

    if (hasDifferendMinMaxValues) {
      exData[col] = exData[col] + '-' + prettifySeconds(exData[col + 'Max']);
    }
  } else {
    exData[col] = exData[col + 'Min'];

    if (hasDifferendMinMaxValues) {
      exData[col] = exData[col] + '-' + exData[col + 'Max'];
    }

    exData[col] = exData[col] + ' ' + ending;
  }
}

export default function mergeColMinMax(exData, col1Ending, col2Ending) {
  mergeColMinMaxHelper(exData, 'col1', col1Ending);
  mergeColMinMaxHelper(exData, 'col2', col2Ending);
}
