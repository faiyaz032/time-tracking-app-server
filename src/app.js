//dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { notFoundHandler, defaultErrorHandler } = require('./middlewares/errorHandlers');
const apiRouter = require('./routes');

//Initialize the app
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello from Time Tracking App Server',
  });
});

//routes
app.use('/api', apiRouter);

//error handlers
app.all('*', notFoundHandler);
app.use(defaultErrorHandler);

module.exports = app;
