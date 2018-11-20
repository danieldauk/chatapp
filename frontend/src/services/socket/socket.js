import io from 'socket.io-client';

let socketIO = null; // eslint-disable-line

export const initSocket = token => new Promise((resolve, reject) => {
  const socket = io.connect(process.env.VUE_APP_BASE_URL);
  socket.on('connect', () => {
    socket
      .on('authenticated', () => {
        socketIO = socket;
        resolve();
        // socket.emit('REQUEST_USER_INFO');
        // socket.on('RESPONSE_USER_INFO', (data) => {
        //   console.log(data);
        // });
      })
      .on('unauthorized', () => {
        reject();
      })
      .emit('authenticate', {
        token
      });
  });
});
export default socketIO;
