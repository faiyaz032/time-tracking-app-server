// @ts-nocheck
const jwt = require('jsonwebtoken');

/**
 * This function signs jwt token
 * @param {string} id
 * @param {string} email
 * @returns {string}
 */
const signJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET_KEY, {
    expiresIn: '24h',
  });
};

module.exports = signJwt;
