// @ts-nocheck
//dependencies
const express = require('express');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const isAuth = (req, res, next) => {
  // extract the authorization header from the request
  const authHeader = `${req.get('Authorization')}`;

  // split the authorization header to extract the token
  const [, token] = authHeader.split(' ');

  // check if a token is provided
  if (!token) {
    return next(new AppError(400, 'Please provide a valid JWT token'));
  }

  try {
    // verify and decode the JWT token using the JWT_SECRET_KEY
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('🚀 ~ file: isAuth.js:27 ~ isAuth ~ decoded:', decoded);

    // check if the token is valid and contains decoded information
    if (!decoded) {
      throw new AppError(401, 'Authentication Failed');
    }

    // set the decoded user information in the request object
    req.user = decoded;

    return next();
  } catch (error) {
    throw new AppError(401, 'Authentication Failed');
  }
};

module.exports = isAuth;
