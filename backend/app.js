require('dotenv-flow').config();
const express = require('express');
const socketIO = require('socket.io');
const helmet = require('helmet');
const winston = require('winston');
const cors = require('cors');

// routes
const users = require('./routes/users');
const auth = require('./routes/auth');
const avatars = require('./routes/avatars');

// initialize app
require('./startup/winston')();
require('./startup/db')();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.static('uploads'));
app.use(cors());
app.options('*', cors());

// add routes
// TODO: extract shared checking logic (requesting user in conversation, etc.) to separate functions for reusability
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/avatars', avatars);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Server is listening on port ${port}. Environment: ${process.env.NODE_ENV}`));

// instantiate socket server
const io = socketIO(server);
require('./socket/socket')(io);
