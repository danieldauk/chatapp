const handler = enumName => ({
  get(object, propName) {
    if (Object.prototype.hasOwnProperty.call(object, propName)) {
      return object[propName];
    }
    throw new Error(`No such property (${propName}) in ${enumName}`);
  }
});

class Enumerator {
  constructor(name, object) {
    const enumName = name;
    const keys = Object.keys(object);
    keys.forEach((key) => {
      this[key] = object[key];
    });
    return new Proxy(Object.freeze(this), handler(enumName));
  }
}

export const SocketEventsEnum = new Enumerator('SocketEventsEnum', {
  // user events
  REQUEST_USER_INFO: 'REQUEST_USER_INFO',
  RESPONSE_USER_INFO: 'RESPONSE_USER_INFO',
  REQUEST_FIND_PEOPLE: 'REQUEST_FIND_PEOPLE',
  RESPONSE_FIND_PEOPLE: 'RESPONSE_FIND_PEOPLE',
  // contacts events
  REQUEST_CONTACTS: 'REQUEST_CONTACTS',
  RESPONSE_CONTACTS: 'RESPONSE_CONTACTS',
  REQUEST_ADD_CONTACT: 'REQUEST_ADD_CONTACT',
  RESPONSE_ADD_CONTACT: 'RESPONSE_ADD_CONTACT',
  REQUEST_REMOVE_CONTACT: 'REQUEST_REMOVE_CONTACT',
  RESPONSE_REMOVE_CONTACT: 'RESPONSE_REMOVE_CONTACT',
  // messages events
  REQUEST_MESSAGES: 'REQUEST_MESSAGES',
  RESPONSE_MESSAGES: 'RESPONSE_MESSAGES',
  SEND_MESSAGE: 'REQUEST_SEND_MESSAGE',
  RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',
  // conversation events
  REQUEST_CREATE_CONVERSATION: 'REQUEST_CREATE_CONVERSATION',
  RESPONSE_CREATE_CONVERSATION: 'RESPONSE_CREATE_CONVERSATION',
  REQUEST_CONVERSATIONS: 'REQUEST_CONVERSATIONS',
  RESPONSE_CONVERSATIONS: 'RESPONSE_GET_CONVERSATIONS',
  // general
  LIST_OF_ONLINE_USERS: 'LIST_OF_ONLINE_USERS',
  ERROR: 'ERROR'
});

export const ActiveTabEnum = new Enumerator('ActiveTabEnum', {
  CONTACTS: 'CONTACTS',
  CHATS: 'CHATS',
  PEOPLE: 'PEOPLE'
});
