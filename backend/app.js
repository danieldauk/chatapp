require('dotenv-flow').config();
const express = require('express');
const helmet = require('helmet');
const winston = require('winston');

// initialize app
require('./startup/winston')();
require('./startup/db')();

const app = express();

app.use(helmet());
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Server is listening on port ${port}`));
