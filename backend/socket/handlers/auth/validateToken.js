const socketioJwt = require('socketio-jwt');
const fs = require('fs');
const path = require('path');

const certPath = path.join(__dirname, '../../../id_rsa.pub');
const cert = fs.readFileSync(certPath);

module.exports = socketioJwt.authorize({
  secret: cert,
  timeout: 5000
});
