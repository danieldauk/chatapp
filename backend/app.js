require('dotenv-flow').config();
const express = require('express');
const helmet = require('helmet');
const winston = require('winston');
const cors = require('cors');
// routes
const users = require('./routes/users');
const auth = require('./routes/auth');
const avatars = require('./routes/avatars');
const conversations = require('./routes/conversations');
const messages = require('./routes/messages');


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
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/avatars', avatars);
app.use('/api/conversations', conversations);
app.use('/api/messages', messages);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Server is listening on port ${port}. Environment: ${process.env.NODE_ENV}`));
