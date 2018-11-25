const { SocketEventsEnum } = require('../utils/enumerators');
// auth events handlers
const validateToken = require('./handlers/auth/validateToken');
// user events handlers
const getUserInfo = require('./handlers/users/getUserInfo');
// contacts events handlers
const getContacts = require('./handlers/users/contacts/getContacts');
const addContact = require('./handlers/users/contacts/addContact');
const removeContact = require('./handlers/users/contacts/removeContact');
// conversation events handlers
const createConversation = require('./handlers/conversations/createConversation');
// messages events handlers
const getMessages = require('./handlers/messages/getMessages');

module.exports = (io) => {
  io
    .on(
      'connect',
      validateToken
    )
    .on('authenticated', (socket) => {
      const userId = socket.decoded_token._id;
      // USER events
      // USER: get user info
      socket.on(SocketEventsEnum.REQUEST_USER_INFO, async () => {
        socket.emit(SocketEventsEnum.RESPONSE_USER_INFO, await getUserInfo(userId));
      });
      // CONTACTS events
      // CONTACTS: get all user contacts
      socket.on(SocketEventsEnum.REQUEST_CONTACTS, async () => {
        socket.emit(SocketEventsEnum.RESPONSE_CONTACTS, await getContacts(userId));
      });
      // CONTACTS: add contact to contacts list
      socket.on(SocketEventsEnum.REQUEST_ADD_CONTACT, async (contactId) => {
        socket.emit(SocketEventsEnum.RESPONSE_ADD_CONTACT, await addContact(userId, contactId));
      });
      // CONTACTS: remove contact from contacts list
      socket.on(SocketEventsEnum.REQUEST_REMOVE_CONTACT, async (contactId) => {
        socket.emit(SocketEventsEnum.RESPONSE_REMOVE_CONTACT, await removeContact(userId, contactId));
      });
      // CONVERSATION events
      socket.on(SocketEventsEnum.REQUEST_CREATE_CONVERSATION, async (participants) => {
        socket.emit(SocketEventsEnum.RESPONSE_CREATE_CONVERSATION, await createConversation(userId, participants));
      });
      // MESSAGES events
      socket.on(SocketEventsEnum.REQUEST_MESSAGES, async (conversationId) => {
        socket.emit(SocketEventsEnum.RESPONSE_MESSAGES, await getMessages(userId, conversationId));
      });
    });
};
