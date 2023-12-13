const express = require('express');
const usersController = require('../controllers/auth.controller');
const checkUserInputs = require('../middlewares/checkUserInputs');
const isAuth = require('../middlewares/isAuth');

const userRouter = express.Router();

userRouter.get('/isAuthenticated', isAuth, usersController.isAuthenticated);
userRouter.post('/register', checkUserInputs, usersController.register);
userRouter.post('/login', usersController.login);
userRouter.get('/logout', usersController.logout);

module.exports = userRouter;
