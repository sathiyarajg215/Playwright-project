require('dotenv').config();

// Central place to read all env vars, so no other file calls process.env directly.
require('dotenv').config();

module.exports = {
  baseUrl: process.env.BASE_URL,
  username: process.env.SAUCE_USERNAME,
  password: process.env.SAUCE_PASSWORD,
  lockedUser: process.env.LOCKED_USER,
  problemUser: process.env.PROBLEM_USER,
  glitchUser: process.env.GLITCH_USER,
  apiBaseUrl: process.env.API_BASE_URL,
  apiKey: process.env.API_KEY,
  checkoutFirstName: process.env.CHECKOUT_FIRST_NAME,
  checkoutLastName: process.env.CHECKOUT_LAST_NAME,
  checkoutPostalCode: process.env.CHECKOUT_POSTAL_CODE,
};