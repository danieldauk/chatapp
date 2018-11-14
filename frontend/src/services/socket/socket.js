import io from 'socket.io-client';

let socketIO = null;

export const initSocket = (token) => {
  // TODO: create handlers for socket events
  socketIO = io.connect(process.env.VUE_APP_BASE_URL);
  socketIO.on('connect', () => {
    socketIO
      .on('authenticated', () => {
        console.log('authenticated');
      })
      .emit('authenticate', {
        token
      });
  });
};

export default socketIO;
