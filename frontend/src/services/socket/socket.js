import io from 'socket.io-client';
import store from '@/store/store';
import listeners from './listeners';

const socketIO = new Proxy(
  {
    socket: null
  },
  {
    get(object, propName) {
      if (propName !== 'socket') {
        return object.socket[propName];
      }
      return object.socket;
    }
  }
);

export const initSocket = (token, userId) => new Promise((resolve, reject) => {
  if (!socketIO.socket) {
    const socket = io.connect(process.env.VUE_APP_BASE_URL, {
      query: {
        userId
      }
    });
    socket.on('connect', () => {
      socket
        .on('authenticated', () => {
          socketIO.socket = socket;
          // get all necessary data for app init
          store.dispatch('user/load');
          store.dispatch('contact/load');
          store.dispatch('conversation/loadAll');

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
