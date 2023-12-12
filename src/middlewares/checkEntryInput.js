//dependencies
const express = require('express');
const AppError = require('../utils/AppError');

/**
 * This function handles all the users register logic
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const checkEntryInput = async (req, res, next) => {
  const { date, startTime, endTime } = req.body;

  if (!date || !startTime || !endTime) {
    return next(new AppError(400, 'Please provide all the required fields'));
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;

  if (!dateRegex.test(date)) {
    return next(new AppError(400, 'Please provide a valid date'));
  }

  if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
    return next(new AppError(400, 'Please provide a valid time'));
  }

  next();
};

module.exports = checkEntryInput;
