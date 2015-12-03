/*
 * Ported from:
 * fitbird-spa / src / main / webapp / app / app.js
 * Commit: 5135bf5
 */

import days from './days';

export default function getDayName(date) {
	return days[date.getDay()];
};
