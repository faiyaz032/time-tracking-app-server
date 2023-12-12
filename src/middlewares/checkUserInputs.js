//dependencies
const express = require('express');
const AppError = require('../utils/AppError');

/**
 * This function handles all the users register logic
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const checkUserInputs = async (req, res, next) => {
  const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new AppError(400, 'Please provide all the required fields'));
    }

    //validate email
    if (!re.test(email)) {
      return next(new AppError(400, 'Please provide a valid email'));
    }

    // Validate password length
    if (password.length < 6) {
      return next(new AppError(400, 'Password must be at least 6 characters long'));
    }
    //pass to the controller
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkUserInputs;
