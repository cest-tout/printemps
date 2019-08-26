import { addHours, addSeconds, format, getHours } from 'date-fns';

export function bytesToImage(format, bytes) {
  const base64String = bytes.reduce((str, b) => {
    return (str += String.fromCharCode(b));
  }, '');
  return `data:${format};base64,${window.btoa(base64String)}`;
}

export function formatSec(sec = 0) {
  sec = Number(sec);
  if (isNaN(sec) || sec === 0) {
    return '0:00';
  }

  const date = new Date(0);
  const timezoneDiff = date.getTimezoneOffset() / 60;
  const dateZero = addHours(date, timezoneDiff);

  const dateWithSec = addSeconds(dateZero, sec);
  return format(dateWithSec, getHours(dateWithSec) > 1 ? 'h:mm:ss' : 'm:ss');
}
