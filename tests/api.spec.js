const { test, expect } = require('@playwright/test');
const { ApiHelper } = require('../api/apiHelper');

// SauceDemo has no real backend API, so these are skipped by default.
// Once you have a real API_BASE_URL in .env, remove `.skip` and adjust
// the paths/assertions in api/apiHelper.js and below to match your API.
test.describe('API flow (enable once a real API_BASE_URL is set)', () => {
  let api;

  test.beforeAll(async () => {
    api = new ApiHelper();
    await api.init();
  });

  test.afterAll(async () => {
    await api.dispose();
  });

  test('full order flow via API', async () => {
    const login = await api.login();
    expect(login.ok).toBeTruthy();

    const products = await api.getProducts();
    expect(products.ok).toBeTruthy();

    const productId = products.body[0].id;
    const cart = await api.addToCart(productId, 1);
    expect(cart.ok).toBeTruthy();

    const checkout = await api.checkout({
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '600001',
    });
    expect(checkout.ok).toBeTruthy();

    const order = await api.placeOrder({ productId, quantity: 1 });
    expect(order.ok).toBeTruthy();
  });
});
