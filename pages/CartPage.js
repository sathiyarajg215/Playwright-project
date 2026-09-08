class CartPage {
  constructor(page) {
    this.page = page;

    this.cartItems =
      page.getByTestId('inventory-item');

    this.checkoutButton =
      page.getByTestId('checkout');
  }

  async expectProductInCart(productName) {
    await this.cartItems
      .filter({ hasText: productName })
      .waitFor();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = CartPage;