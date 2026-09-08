// checkout-step-two.html: review order summary and place/finish the order
exports.CheckOutOverviewPage = class CheckOutOverviewPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  async verifyOnCheckoutStepTwo() {
    await this.page.waitForURL('**/checkout-step-two.html');
  }

  async getTotalText() {
    return this.totalLabel.textContent();
  }

  async placeOrder() {
    await this.finishButton.click();
  }
}

