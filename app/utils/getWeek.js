/*
 * Ported from:
 * fitbird-spa / src / main / webapp / app / app.js
 * Commit: 5135bf5
 */

export default function getWeek(date) {
	if(!date){
		date = new Date();
	}

	var d = new Date(+date);
	d.setHours(0, 0, 0);
	d.setDate(d.getDate() + 4 - (d.getDay() || 7));
	return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};
