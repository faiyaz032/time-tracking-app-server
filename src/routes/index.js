const express = require('express');
const userRouter = require('./auth.routes');
const entriesRouter = require('./entries.routes');

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/entries', entriesRouter);

module.exports = apiRouter;
