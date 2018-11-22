const { SocketEventsEnum } = require('../utils/enumerators');
// auth handler
const validateToken = require('./handlers/auth/validateToken');
// user handlers
const emitUserInfo = require('./handlers/users/emitUserInfo');
const emitUserContacts = require('./handlers/users/contacts/emitUserContacts');


module.exports = (io) => {
  io
    .on(
      'connect',
      validateToken
    )
    .on('authenticated', (socket) => {
      const userId = socket.decoded_token._id;
      // user events
      socket.on(SocketEventsEnum.REQUEST_USER_INFO, async () => {
        socket.emit(SocketEventsEnum.RESPONSE_USER_INFO, await emitUserInfo(userId));
      });
      socket.on(SocketEventsEnum.REQUEST_USER_CONTACTS, async () => {
        socket.emit(SocketEventsEnum.RESPONSE_USER_CONTACTS, await emitUserContacts(userId));
      });

      // message events

      // conversation events
    });
};
