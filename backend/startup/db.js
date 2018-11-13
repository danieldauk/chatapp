const mongoose = require('mongoose');
const winston = require('winston');

const URI = process.env.DB_URI;
console.log(URI);

module.exports = () => {
  mongoose
    .connect(URI)
    .then(() => winston.info('Connected to database'))
    .catch(error => winston.error(`Failed to connect to database:\n ${error}`));
};
