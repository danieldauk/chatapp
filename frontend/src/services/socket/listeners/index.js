import { SocketEventsEnum } from '@/utils/enumerators';
import store from '@/store/store';
import userEventListeners from './userEventListeners';
import conversationEventListeners from './conversationEventListeners';
import contactEventListeners from './contactEventListeners';
import messageEventListeners from './messageEventListeners';


export default (socket) => {
  // USER EVENTS
  userEventListeners(socket);
  // CONTACT EVENTS
  contactEventListeners(socket);
  // CONVERSATION EVENTS
  conversationEventListeners(socket);
  // MESSAGE EVENTS
  messageEventListeners(socket);
  // CURRENTLY ONLINE USERS BROADCAST
  socket.on(SocketEventsEnum.LIST_OF_ONLINE_USERS, (list) => {
    store.dispatch('person/setOnline', list);
  });
  // ERROR EVENT
  socket.on(SocketEventsEnum.ERROR, (error) => {
    console.error(error);
  });
};
