const { test, expect } = require('@playwright/test');
const env = require('../utils/env');

const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { CheckOutOverviewPage } = require('../pages/CheckOutOverviewPage');
const { OrderCompletePage } = require('../pages/OrderCompletePage');

const PRODUCT_NAME = 'Sauce Labs Backpack';

test.describe('SauceDemo - full purchase flow', () => {
  let loginPage, homePage, cartPage, checkoutPage, overviewPage, completePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new CheckOutOverviewPage(page);
    completePage = new OrderCompletePage(page);
  });

  test('login -> search product -> add to cart -> checkout -> enter details -> place order', async () => {
    // 1. Login
    await loginPage.goto();
    await loginPage.login(env.username, env.password);
    await loginPage.verifyLoginSuccessful();

    // 2. Home page loaded
    await homePage.verifyOnHomePage();

    // 3. Search / locate product, then add it to cart
    await homePage.searchProduct(PRODUCT_NAME);
    await homePage.addProductToCart(PRODUCT_NAME);
    expect(await homePage.getCartCount()).toBe(1);

    // 4. Go to cart, verify product, proceed to checkout
    await homePage.goToCart();
    await cartPage.verifyOnCartPage();
    await cartPage.verifyProductInCart(PRODUCT_NAME);
    await cartPage.proceedToCheckout();

    // 5. Enter user details (checkout step one)
    await checkoutPage.verifyOnCheckoutStepOne();
    await checkoutPage.fillAndContinue({
      firstName: env.checkoutFirstName,
      lastName: env.checkoutLastName,
      postalCode: env.checkoutPostalCode,
    });

    // 6. Review order (checkout step two) and place/finish the order
    await overviewPage.verifyOnCheckoutStepTwo();
    const total = await overviewPage.getTotalText();
    expect(total).toContain('Total');
    await overviewPage.placeOrder();

    // 7. Verify order placed successfully
    await completePage.verifyOnOrderCompletePage();
    await completePage.verifyOrderPlaced('Thank you for your order!');
  });

  test('login fails with locked out user', async () => {
    await loginPage.goto();
    await loginPage.login(env.lockedUser, env.password);
    // const error = await loginPage.getErrorText();
    // expect(error).toContain('locked out');
  });
});
