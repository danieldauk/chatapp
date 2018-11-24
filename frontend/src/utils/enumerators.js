const handler = enumName => ({
  get(object, propName) {
    if (Object.prototype.hasOwnProperty.call(object, propName) || propName === 'getValues') {
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

  getValues() {
    return Object.values(this);
  }
}

export const SocketEventsEnum = new Enumerator(
  'SocketEventsEnum',
  {
    REQUEST_USER_INFO: 'REQUEST_USER_INFO',
    RESPONSE_USER_INFO: 'RESPONSE_USER_INFO',
    REQUEST_CONTACTS: 'REQUEST_CONTACTS',
    RESPONSE_CONTACTS: 'RESPONSE_CONTACTS'
  }
);
