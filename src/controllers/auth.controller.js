// @ts-nocheck
//dependencies
const express = require('express');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/AppError');
const pool = require('../config/database');
const signJwt = require('../utils/signJwt');

/**
 * This function handles all the users register logic
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const db = await pool.getConnection();

    //fetch user with given email
    const [result] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);

    //check if the users exists
    if (result.length) {
      return next(new AppError(403, 'User already exists'));
    }

    //generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user entry to the database
    const [newUser] = await db.query(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [
      name,
      email,
      hashedPassword,
    ]);

    if (newUser.affectedRows > 0) {
      //sign token
      const token = signJwt(newUser.insertId);
      return res.status(201).json({
        status: 'success',
        message: 'New user registered successfully',
        data: { id: newUser.insertId, name, email, token },
      });
    }
  } catch (error) {
    console.log(error);
    next(new AppError(500, error.message));
  }
};

/**
 * This function handles all the users login logic
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const login = async (req, res, next) => {};

module.exports = { register };
