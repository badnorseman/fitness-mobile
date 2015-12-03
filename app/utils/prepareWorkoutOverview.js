/*
 * Ported from:
 * fitbird-spa / src / main / webapp / app / services / planService.js
 * Commit: 5135bf5
 */

import setMinMax from './setMinMax';
import mergeColMinMax from './mergeColMinMax';

export default function prepareWorkoutOverview(workout) {
		var data = [];
		for (var i = 0; i < workout.exerciseGroups.length; i++) {
			var exGroup = workout.exerciseGroups[i];
			var egData = [];

			for (var j = 0; j < exGroup.exercises.length; j++) {
				var ex = exGroup.exercises[j];
				var exData = {setsNo: 0, loadTest: false, loadTestOptional: false, col1Min: '', col1Max: '', col1: '',
					col2Min: '', col2Max: '', col2: ''};

				for (var k = 0; k < exGroup.sets.length; k++) {
					if (exGroup.sets[k].exerciseId === ex.id && !exGroup.sets[k].warmup) {
						if (exGroup.sets[k].loadTest) {
							exData.loadTest = true;
							break;
						} else if (exGroup.sets[k].loadTestOptional) {
							exData.loadTestOptional = true;
							break;
						}
						exData.setsNo++;
					}
				}

				if (!exData.loadTest) {
					switch (ex.type) {
						case 'DURATION_DISTANCE':
							setMinMax(exData, 'distance', 'duration', exGroup.sets, ex.id);
							mergeColMinMax(exData, 'm', '');
							break;
						case 'DURATION_REPS':
							setMinMax(exData, 'repetitions', 'duration', exGroup.sets, ex.id);
							mergeColMinMax(exData, 'reps', '');
							break;
						case 'DURATION':
							setMinMax(exData, 'duration', '', exGroup.sets, ex.id);
							mergeColMinMax(exData, '', '');
							break;
						case 'REPS':
							setMinMax(exData, 'repetitions', '', exGroup.sets, ex.id);
							mergeColMinMax(exData, 'reps', '');
							break;
						case 'LOAD_REPS':
						case 'LOAD_REPS_TEST':
							setMinMax(exData, 'repetitions', 'load', exGroup.sets, ex.id);
							mergeColMinMax(exData, 'reps', 'kg');
							break;
						case 'LOAD_DISTANCE':
							setMinMax(exData, 'distance', 'load', exGroup.sets, ex.id);
							mergeColMinMax(exData, 'm', 'kg');
							break;
					}
				}

				egData.push(exData);
			}
			data.push(egData);
		}

		return data;
	}
