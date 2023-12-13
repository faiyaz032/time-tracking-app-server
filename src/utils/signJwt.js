// @ts-nocheck
const jwt = require('jsonwebtoken');

/**
 * This function signs jwt token
 * @param {string} id
 * @param {string} email
 * @returns {string}
 */
const signJwt = (id, email, name) => {
  return jwt.sign({ id, email, name }, process.env.JWT_SECRET_KEY, {
    expiresIn: '24h',
  });
};

module.exports = signJwt;
