const express = require('express');
const usersController = require('../controllers/auth.controller');
const checkUserInputs = require('../middlewares/checkUserInputs');

const userRouter = express.Router();

userRouter.post('/register', checkUserInputs, usersController.register);
userRouter.post('/login', usersController.login);

module.exports = userRouter;
