//@ts-nocheck
const express = require('express');
const isAuth = require('../middlewares/isAuth');
const checkEntryInput = require('../middlewares/checkEntryInput');
const entriesController = require('../controllers/entries.controller');

const entriesRouter = express.Router();

entriesRouter.post('/', isAuth, checkEntryInput, entriesController.createEntry);
entriesRouter.get('/', isAuth, entriesController.getEntries);
entriesRouter.get('/timesheet', isAuth, entriesController.getWeeklyTimeSheet);

module.exports = entriesRouter;
