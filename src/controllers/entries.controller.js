// @ts-nocheck
//dependencies
const express = require('express');
const AppError = require('../utils/AppError');
const pool = require('../config/database');

/**
 * This function handles all the logic to create an entry
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const createEntry = async (req, res, next) => {
  const { date, startTime, endTime, note } = req.body;
  const { id: userId } = req.user;

  try {
    //get db connection
    const db = await pool.getConnection();

    //create entry
    const [result] = await db.query(
      `INSERT INTO entries (userId, date, startTime, endTime, note) VALUES (?, ?, ?, ?, ?)`,
      [userId, date, startTime, endTime, note]
    );

    if (result.affectedRows > 0) {
      res.status(201).json({
        status: 'success',
        message: 'Entry created successfully',
        data: { ...req.body },
      });
    }
  } catch (error) {
    console.log(error);
    next(new AppError(500, error.message));
  }
};

/**
 * This function handles all the logic to get all entries of an user
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getEntries = async (req, res, next) => {
  const { id: userId } = req.user;

  try {
    const db = await pool.getConnection();

    const [result] = await db.query('SELECT * from entries WHERE userId = ?', [userId]);
    console.log('🚀 ~ file: entries.controller.js:53 ~ getEntries ~ result:', result);

    res.status(200).json({
      status: 'success',
      message: 'All entries fetched successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(new AppError(500, error.message));
  }
};

/**
 * This function handles all the logic to get weekly timesheet data of an user
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getWeeklyTimeSheet = async (req, res, next) => {};

module.exports = { createEntry, getEntries, getWeeklyTimeSheet };
