// checkout-complete.html: final "order placed" confirmation
exports.OrderCompletePage = class OrderCompletePage {
  constructor(page) {
    this.page = page;
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async verifyOnOrderCompletePage() {
    await this.page.waitForURL('**/checkout-complete.html');
  }

  async getConfirmationMessage() {
    return this.completeHeader.textContent();
  }

  async verifyOrderPlaced(expectedMessage = 'Thank you for your order!') {
    await this.completeHeader.waitFor({ state: 'visible' });
    const text = await this.getConfirmationMessage();
    if (text.trim() !== expectedMessage) {
      throw new Error(`Expected "${expectedMessage}" but got "${text}"`);
    }
  }

  async backToProducts() {
    await this.backHomeButton.click();
  }
}


