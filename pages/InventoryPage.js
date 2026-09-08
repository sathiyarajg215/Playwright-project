class InventoryPage {
  constructor(page) {
    this.page = page;

    this.inventoryContainer =
      page.getByTestId('inventory-container');

    this.inventoryItems =
      page.getByTestId('inventory-item');

    this.cartLink =
      page.getByTestId('shopping-cart-link');

    this.sortDropdown =
      page.getByTestId('product-sort-container');
  }

  async expectInventoryPage() {
    await this.inventoryContainer.waitFor();
  }

  async addProductToCart(productName) {
    const product = this.inventoryItems.filter({
      hasText: productName
    });

    await product
      .getByRole('button', { name: /add to cart/i })
      .click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = InventoryPage;