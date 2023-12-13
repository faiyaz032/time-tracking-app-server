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
const isAuthenticated = async (req, res, next) => {
  try {
    if (req.user) {
      return res.status(200).json({ status: 'success', message: 'User is authenticated' });
    }
  } catch (error) {
    console.log(error);
    next(new AppError(500, error.message));
  }
};

/**
 * This function handles all the users register logic
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  let db;

  try {
    db = await pool.getConnection();

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

      //sign jwt cookie
      res.cookie('AUTH_COOKIE', `Bearer ${token}`, {
        maxAge: 3600000 * 24,
        httpOnly: true,
      });

      return res.status(201).json({
        status: 'success',
        message: 'New user registered successfully',
        data: { id: newUser.insertId, name, email },
      });
    }
  } catch (error) {
    console.log(error);
    next(new AppError(500, error.message));
  } finally {
    db.release();
  }
};

/**
 * This function handles all the users login logic
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(401, 'Please provide email and password to log in'));
  }

  let db;

  try {
    db = await pool.getConnection();

    //fetch user with given email
    const [result] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);

    //check if the users exists
    if (result.length === 0) {
      return next(new AppError(401, 'No user exists with this email'));
    }

    //compare the passwords
    const isValidPassword = await bcrypt.compare(password, result[0].password);
    //check if password is valid

    if (!isValidPassword) {
      return next(new AppError(401, 'Incorrect Password'));
    }

    //sign token
    const token = signJwt(result[0].id, result[0].email);

    res.cookie('AUTH_COOKIE', `Bearer ${token}`, {
      maxAge: 3600000 * 24,
      httpOnly: true,
    });

    //send response
    return res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      data: {
        name: result[0].name,
        email,
      },
    });
  } catch (error) {
    console.log(error);
    next(new AppError(500, error.message));
  } finally {
    if (db) db.release();
  }
};

/**
 * This function destroy the cookie and logout
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const logout = async (req, res, next) => {
  try {
    if (req.cookies.AUTH_COOKIE) {
      res.clearCookie('AUTH_COOKIE', {
        httpOnly: true,
      });

      return res.status(200).json({
        status: 'success',
        message: 'Logout successfully',
      });
    } else {
      return res.status(400).json({
        status: 'fail',
        message: 'Noo cookies available to destroy',
      });
    }
  } catch (error) {
    console.log(error);
    next(new AppError(500, error.message));
  }
};

module.exports = { register, login, isAuthenticated, logout };
