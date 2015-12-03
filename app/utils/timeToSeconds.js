/*
 * Ported from:
 * fitbird-spa / src / main / webapp / app / services / utilService.js
 * Commit: 5135bf5
 */

export default function timeToSeconds(time) {
  var seconds = parseInt(time.substring(3));
  seconds += parseInt(time.substring(0, 2)) * 60;
  return seconds;
}
