import io from 'socket.io-client';
import { SocketEventsEnum } from '@/utils/enumerators';
import listeners from './listeners';

let socketIO = null; // eslint-disable-line

export const initSocket = token => new Promise((resolve, reject) => {
  if (!socketIO) {
    const socket = io.connect(process.env.VUE_APP_BASE_URL);
    socket.on('connect', () => {
      socket
        .on('authenticated', () => {
          socketIO = socket;
          // get all necessary data for app init
          socket.emit(SocketEventsEnum.REQUEST_USER_INFO);
          socket.emit(SocketEventsEnum.REQUEST_USER_CONTACTS);
          // socket.emit(SocketEventsEnum.REQUEST_CONVERSATIONS);
          // socket.emit(SocketEventsEnum.REQUEST_MESSAGES);

          // setup event listeners
          listeners(socket);
          // resolve promise
          resolve();
        })
        .on('unauthorized', () => {
          reject({
            error: 'Authentication failed during socket connection'
          });
        })
        .emit('authenticate', {
          token
        });
    });
  } else {
    reject({
      error: 'Socket already initialized'
    });
  }
});
export default socketIO;
