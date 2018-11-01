const mongoose = require('mongoose');
const winston = require('winston');

const URI = process.env.DB_URI;

module.exports = () => {
  mongoose
    .connect(URI)
    .then(() => winston.info('connected to database'))
    .catch(error => winston.error('failed to connect to database\n', error));
};
