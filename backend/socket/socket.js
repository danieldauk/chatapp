// auth handler
const validateToken = require('./handlers/auth/validateToken');
// user handlers
const emitUserInfo = require('./handlers/users/emitUserInfo');


module.exports = (io) => {
  io
    .on(
      'connect',
      validateToken
    )
    .on('authenticated', (socket) => {
      const userId = socket.decoded_token._id;
      // user events
      socket.on('REQUEST_USER_INFO', async () => {
        socket.emit('RESPONSE_USER_INFO', await emitUserInfo(userId));
      });
      // message events

      // conversation events
    });
};
