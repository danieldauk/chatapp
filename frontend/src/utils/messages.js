import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import moment from 'moment';

export const sortMessages = (messages) => {
  const groupedMessages = groupBy(messages, message => moment(message.createdAt)
    .startOf('day')
    .format());
  const transformedMessages = [];
  Object.keys(groupedMessages).forEach((date) => {
    transformedMessages.push({
      date,
      messages: groupedMessages[date]
    });
  });
  return orderBy(transformedMessages, 'date', 'asc').map((date) => {
    date.messages = orderBy(date.messages, 'createdAt', 'asc');
    return date;
  });
};

export const transformMessage = message => ({
  date: moment(message.createdAt).startOf('day').format(),
  message
});
