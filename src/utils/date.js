import moment from 'moment';

export function calculateDaysBetweenDates(date1, date2) {
  let d1 = moment(date1);
  let d2 = moment(date2);
  return d1.diff(d2, 'days');
}

export function calculateAverageDays(intervals) {
  if (intervals.length === 0) return 0;
  let sum = intervals.reduce((a, b) => a + b, 0);
  return Math.round(sum / intervals.length);
}

export function calculateAverageLifespan(generations) {
  let lifespans = generations
    .filter(gen => gen.discontinued && moment(gen.releaseDate).isValid() && moment(gen.discontinued).isValid())
    .map(gen => calculateDaysBetweenDates(gen.discontinued, gen.releaseDate));
  return calculateAverageDays(lifespans);
}
