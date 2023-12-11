//Dependencies
const express = require('express');
const AppError = require('../utils/AppError');

/**
 * This function handles all the not found route requests
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const notFoundHandler = (req, res, next) => {
  next(new AppError(404, `Your requested url ${req.originalUrl} was not found on this server!`));
};

/**
 * This handlers function handles all the global/default errors of this application
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const defaultErrorHandler = (error, req, res, next) => {
  error.status = error.status || 'error';
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({ status: error.status, message: error.message });
};

module.exports = { notFoundHandler, defaultErrorHandler };
