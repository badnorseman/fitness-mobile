/*
 * Ported from:
 * fitbird-spa / src / main / webapp / app / services / utilService.js
 * Commit: 5135bf5
 */

export default function prettifySeconds(seconds) {
  if (!seconds) {
    return '';
  }

  let min = Math.floor(seconds / 60);
  min = min < 10 ? '0' + min : min;
  let sec = seconds % 60;
  sec = sec < 10 ? '0' + sec : sec;
  return min + ':' + sec;
}

