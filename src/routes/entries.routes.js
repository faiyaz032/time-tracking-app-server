const express = require('express');
const isAuth = require('../middlewares/isAuth');
const checkEntryInput = require('../middlewares/checkEntryInput');
const entriesController = require('../controllers/entries.controller');

const entriesRouter = express.Router();

entriesRouter.post('/', isAuth, checkEntryInput, entriesController.createEntry);

module.exports = entriesRouter;
