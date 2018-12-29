import orderBy from 'lodash/orderBy';

export const sortConversations = conversations => orderBy(conversations, 'createdAt', 'desc');
