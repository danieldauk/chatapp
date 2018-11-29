import Vue from 'vue';
import moment from 'moment';
import truncate from 'lodash/truncate';

Vue.filter('formatDate', (value, format = 'YYYY MM DD', areLastSevendDaysRelative) => {
  const givenTime = moment(value).format('x');
  const sevenDaysAgo = moment()
    .startOf('day')
    .subtract(7, 'day')
    .format('x');
  if (givenTime > sevenDaysAgo && areLastSevendDaysRelative) {
    console.log(value);
    return moment(value).calendar(null, {
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      lastWeek: '[last] dddd'
    });
  }
  return moment(value).format(format);
});

Vue.filter('truncateString', (value, limit) => {
  if (!value || typeof value !== 'string') {
    return null;
  }
  if (value.length <= limit) {
    return value;
  }
  return truncate(value, {
    length: limit,
    omission: '...',
    separator: /((\b[^a-zA-z0-9]\s)|[^a-zA-z0-9])/
  });
});
