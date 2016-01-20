/*
 * Ported from:
 * fitbird-spa / src / main / webapp / app / services / utilService.js
 * Commit: 5135bf5
 */

export default function timeToSeconds(time) {
  let seconds = parseInt(time.substring(3), 10);
  seconds += parseInt(time.substring(0, 2), 10) * 60;
  return seconds;
}
