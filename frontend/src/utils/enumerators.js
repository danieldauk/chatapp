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
  REQUEST_USER_INFO: 'REQUEST_USER_INFO',
  RESPONSE_USER_INFO: 'RESPONSE_USER_INFO',
  REQUEST_CONTACTS: 'REQUEST_CONTACTS',
  RESPONSE_CONTACTS: 'RESPONSE_CONTACTS',
  REQUEST_CREATE_CONVERSATION: 'REQUEST_CREATE_CONVERSATION',
  RESPONSE_CREATE_CONVERSATION: 'RESPONSE_CREATE_CONVERSATION',
  REQUEST_MESSAGES: 'REQUEST_MESSAGES',
  RESPONSE_MESSAGES: 'RESPONSE_MESSAGES',
  SEND_MESSAGE: 'REQUEST_SEND_MESSAGE',
  RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',
  ERROR: 'ERROR'
});

export const ActiveTabEnum = new Enumerator('ActiveTabEnum', {
  CONTACTS: 0,
  CHATS: 1,
  REQUESTS: 2,
  PEOPLE: 3
});
