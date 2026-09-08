const env = require('../utils/env');

exports.CheckoutPage = class CheckoutPage {

  constructor(page) {

    this.page = page;

    // Checkout Step One - User Details
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');

    // Buttons
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');

    // Error message
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async verifyOnCheckoutStepOne() {

    await this.page.waitForURL('**/checkout-step-one.html');
  }

  async enterUserDetails({
    firstName = env.checkoutFirstName,
    lastName = env.checkoutLastName,
    postalCode = env.checkoutPostalCode,
  } = {}) {

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {

    await this.continueButton.click();
  }

  async fillAndContinue(userDetails = {}) {

    await this.enterUserDetails(userDetails);
    await this.continueToOverview();
  }
};