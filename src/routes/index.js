const express = require('express');
const authRouter = require('./auth.routes');
const entriesRouter = require('./entries.routes');

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/entries', entriesRouter);

module.exports = apiRouter;
