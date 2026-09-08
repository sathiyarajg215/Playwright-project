exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async verifyOnCartPage() {
    await this.page.waitForURL('**/cart.html');
  }

  async verifyProductInCart(productName) {
    const item = this.page.locator('.cart_item', {
      has: this.page.locator('.inventory_item_name', { hasText: productName }),
    });
    await item.waitFor({ state: 'visible' });
  }

  async getCartItemsCount() {
    return this.cartItems.count();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}


