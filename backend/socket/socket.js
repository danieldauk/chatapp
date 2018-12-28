const { SocketEventsEnum } = require('../utils/enumerators');
// auth events handlers
const validateToken = require('./handlers/auth/validateToken');
// user events handlers
const getUserInfo = require('./handlers/users/getUserInfo');
const findUser = require('./handlers/users/findUser');
// contacts events handlers
const getContacts = require('./handlers/users/contacts/getContacts');
const addContact = require('./handlers/users/contacts/addContact');
const removeContact = require('./handlers/users/contacts/removeContact');
// conversation events handlers
const createConversation = require('./handlers/conversations/createConversation');
const getConversations = require('./handlers/conversations/getConversations');
// messages events handlers
const getMessages = require('./handlers/messages/getMessages');
const sendMessage = require('./handlers/messages/sendMessage');

module.exports = (io) => {
  // assign custom socket id (same as user id)
  io.engine.generateId = (req) => { // eslint-disable-line
    return req._query.userId;
  };
  io.on('connect', validateToken).on('authenticated', (socket) => {
    // broadcast all connected users
    io.emit(
      SocketEventsEnum.LIST_OF_ONLINE_USERS,
      Object.keys(io.sockets.sockets)
    );
    socket.on('disconnect', () => {
      io.emit(
        SocketEventsEnum.LIST_OF_ONLINE_USERS,
        Object.keys(io.sockets.sockets)
      );
    });
    const userId = socket.decoded_token._id;
    // USER events
    // USER: get user info
    socket.on(SocketEventsEnum.REQUEST_USER_INFO, () => {
      getUserInfo(socket, userId);
    });
    // USERS events
    socket.on(SocketEventsEnum.REQUEST_FIND_PEOPLE, (username) => {
      findUser(socket, userId, username);
    });
    // CONTACTS events
    // CONTACTS: get all user contacts
    socket.on(SocketEventsEnum.REQUEST_CONTACTS, () => {
      getContacts(socket, userId);
    });
    // CONTACTS: add contact to contacts list
    socket.on(SocketEventsEnum.REQUEST_ADD_CONTACT, async (contactId) => {
      addContact(socket, userId, contactId);
    });
    // CONTACTS: remove contact from contacts list
    socket.on(SocketEventsEnum.REQUEST_REMOVE_CONTACT, (contactId) => {
      removeContact(socket, userId, contactId);
    });
    // CONVERSATION events
    socket.on(SocketEventsEnum.REQUEST_CREATE_CONVERSATION, (conversation) => {
      createConversation(socket, userId, conversation);
    });
    socket.on(SocketEventsEnum.REQUEST_CONVERSATIONS, () => {
      getConversations(socket, userId);
    });
    // MESSAGES events
    socket.on(SocketEventsEnum.REQUEST_MESSAGES, (conversationId) => {
      getMessages(socket, userId, conversationId);
    });
    socket.on(SocketEventsEnum.SEND_MESSAGE, (data) => {
      sendMessage(socket, userId, data);
    });
  });
};
