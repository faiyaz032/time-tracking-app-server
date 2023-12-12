const express = require('express');
const usersController = require('../controllers/auth.controller');
const checkUserInputs = require('../middlewares/checkUserInputs');

const userRouter = express.Router();

userRouter.post('/register', checkUserInputs, usersController.register);

module.exports = userRouter;
