import io from 'socket.io-client';

export default () => {
  const socket = io(process.env.VUE_APP_BASE_URL);
};
