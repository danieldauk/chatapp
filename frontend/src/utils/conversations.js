import orderBy from 'lodash/orderBy';
import mergeWith from 'lodash/mergeWith';
import keyBy from 'lodash/keyBy';
import isArray from 'lodash/isArray';
import values from 'lodash/values';

export const sortConversations = conversations => orderBy(conversations, 'createdAt', 'desc');

export const mergeHistories = (currentHistory, newHistoryPage) => {
  const customizer = (objValue, srcValue) => {
    if (isArray(objValue)) {
      return objValue.concat(srcValue);
    }
    // if undefined is returned - merging is handled by lodash
    return undefined;
  };
  // remove duplicates
  const filteredNewHistoryPage = newHistoryPage.map((date) => {
    const filteredMessages = date.messages.filter((message) => {
      let wasMessageFound = false;
      currentHistory.forEach((currentDate) => {
        const doesMessageExist = !!currentDate.messages.find(currentMessage => currentMessage._id === message._id);
        if (doesMessageExist) {
          wasMessageFound = true;
        }
      });
      return !wasMessageFound;
    });
    return {
      date: date.date,
      messages: filteredMessages
    };
  });
  const mergedHistories = mergeWith(keyBy(currentHistory, 'date'), keyBy(filteredNewHistoryPage, 'date'), customizer);
  const sortedNewHistory = orderBy(values(mergedHistories), 'date', 'asc').map((date) => {
    date.messages = orderBy(date.messages, 'createdAt', 'asc');
    return date;
  });
  return sortedNewHistory;
};
