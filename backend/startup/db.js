const mongoose = require('mongoose');

const URI = process.env.DB_URI;

module.exports = () => {
  mongoose
    .connect(URI)
    .then(() => console.log('connected to database'))
    .catch(error => console.log('failed to connect to database\n', error));
};
