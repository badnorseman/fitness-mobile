/*
 * Ported from:
 * fitbird-spa / src / main / webapp / app / app.js
 * Commit: 5135bf5
 */

function setMinMaxHelper(exData, field, col, sets, exId) {
  for (var i = 0; i < sets.length; i++) {
    if (sets[i].exerciseId === exId && !sets[i].warmup) {
      var fieldVal = sets[i][field];

      // Skip empty fields
      if (!fieldVal) {
        continue;
      }

      // if it's first set of that ex, set min and max for that col from first set
      if (!exData[col + 'Min']) {
        exData[col + 'Min'] = fieldVal;
        exData[col + 'Max'] = fieldVal;
      }

      if (fieldVal < exData[col + 'Min']) {
        exData[col + 'Min'] = fieldVal;
      } else if (fieldVal > exData[col + 'Max']) {
        exData[col + 'Max'] = fieldVal;
      }
    }
  }
}

export default function setMinMax(exData, field1, field2, sets, exId) {
  if (field1) {
    setMinMaxHelper(exData, field1, 'col1', sets, exId);
  }

  if (field2) {
    setMinMaxHelper(exData, field2, 'col2', sets, exId);
  }
}
