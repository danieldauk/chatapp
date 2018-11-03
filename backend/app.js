require('dotenv-flow').config();
const express = require('express');
const helmet = require('helmet');
const winston = require('winston');
// routes
const users = require('./routes/users');
const auth = require('./routes/auth');

// initialize app
require('./startup/winston')();
require('./startup/db')();

const app = express();
app.use(helmet());
app.use(express.json());

// add routes
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Server is listening on port ${port}. Environment: ${process.env.NODE_ENV}`));
