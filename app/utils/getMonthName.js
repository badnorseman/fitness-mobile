/*
 * Ported from:
 * fitbird-spa / src / main / webapp / app / app.js
 * Commit: 5135bf5
 */

import months from './months';

function getMonthName(date) {
	return months[date.getMonth()];
};
