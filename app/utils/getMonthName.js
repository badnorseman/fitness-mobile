/*
 * Ported from:
 * fitbird-spa / src / main / webapp / app / app.js
 * Commit: 5135bf5
 */

import months from '../constants/months';

export default function getMonthName(date) {
  return months[date.getMonth()];
}
