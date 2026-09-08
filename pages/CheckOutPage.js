class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.firstNameInput =
      page.getByTestId('firstName');

    this.lastNameInput =
      page.getByTestId('lastName');

    this.postalCodeInput =
      page.getByTestId('postalCode');

    this.continueButton =
      page.getByTestId('continue');

    this.finishButton =
      page.getByTestId('finish');

    this.completeHeader =
      page.getByTestId('complete-header');
  }

  async fillCustomerDetails(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async expectOrderComplete() {
    await this.completeHeader.waitFor();
  }
}

module.exports = CheckoutPage;