const { test, expect } = require('@playwright/test');


const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const CartPage = require('../../pages/CartPage');
const CheckoutPage = require('../../pages/CheckOutPage');

const environments = require('../../config/environment');

test.describe('Swag Labs - Checkout Journey', () => {

  test('user can purchase a product successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login is treated as a precondition.
    await loginPage.open();

    await loginPage.login(
      environments.default.username,
      environments.default.password
    );

    // Verify user reached inventory.
    await inventoryPage.expectInventoryPage();

    // Business journey starts here.
    const productName = 'Sauce Labs Backpack';

    await inventoryPage.addProductToCart(productName);

    await inventoryPage.openCart();

    await cartPage.expectProductInCart(productName);

    await cartPage.checkout();

    await checkoutPage.fillCustomerDetails(
      'Test',
      'User',
      '600001'
    );

    await checkoutPage.continueToOverview();

    await checkoutPage.finishOrder();

    await checkoutPage.expectOrderComplete();

    await expect(
      checkoutPage.completeHeader
    ).toHaveText('Thank you for your order!');
  });
});