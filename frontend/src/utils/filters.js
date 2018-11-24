import Vue from 'vue';
import moment from 'moment';
import truncate from 'lodash/truncate';

Vue.filter('formatDate', (value, format = 'YYYY MM DD') => moment(value).format(format));

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
