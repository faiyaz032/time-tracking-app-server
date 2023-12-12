//dependencies
const express = require('express');
const AppError = require('../utils/AppError');

/**
 * This function handles all the logic to create an entry
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const createEntry = async (req, res, next) => {};

/**
 * This function handles all the logic to get all entries of an user
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getEntries = async (req, res, next) => {};

/**
 * This function handles all the logic to get weekly timesheet data of an user
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getWeeklyTimeSheet = async (req, res, next) => {};

module.exports = { createEntry, getEntries, getWeeklyTimeSheet };
