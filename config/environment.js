require('dotenv').config();

const environments = {
  default: {
    uiBaseUrl:
      process.env.UI_BASE_URL || 'https://www.saucedemo.com',

    apiBaseUrl:
      process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com',

    username:
      process.env.SWAGLABS_USERNAME || 'standard_user',

    password:
      process.env.SWAGLABS_PASSWORD || 'secret_sauce',

    bookingId:
      Number(process.env.BOOKING_ID) || 1
  }
};

module.exports = environments;