const winston = require('winston');

module.exports = () => {
  winston.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  );
};
