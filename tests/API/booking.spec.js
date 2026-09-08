const { test, expect } = require('@playwright/test');
const environments = require('../../config/environment');

test.describe('Restful Booker API', () => {

  test('GET booking returns a valid booking payload', async ({
    request
  }) => {

    const response = await request.get(
      `${environments.default.apiBaseUrl}/booking/${environments.default.bookingId}`
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('firstname');
    expect(body).toHaveProperty('lastname');
    expect(body).toHaveProperty('totalprice');
    expect(body).toHaveProperty('depositpaid');
    expect(body).toHaveProperty('bookingdates');

    expect(body.bookingdates).toHaveProperty('checkin');
    expect(body.bookingdates).toHaveProperty('checkout');

    expect(typeof body.firstname).toBe('string');
    expect(typeof body.lastname).toBe('string');
    expect(typeof body.totalprice).toBe('number');
    expect(typeof body.depositpaid).toBe('boolean');
  });


  test('GET unknown booking returns 404', async ({
    request
  }) => {

    const response = await request.get(
      `${environments.default.apiBaseUrl}/booking/999999999`
    );

    expect(response.status()).toBe(404);
  });

});