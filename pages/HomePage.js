exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.productItem = page.locator('.inventory_item');
    this.productName = page.locator('.inventory_item_name');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async verifyOnHomePage() {
    await this.page.waitForURL('**/inventory.html');
    await this.inventoryList.waitFor({ state: 'visible' });
  }

  // SauceDemo has no real search bar, so "search" = locate the product
  // card by its visible name. Swap this out for a real search input
  // (e.g. page.locator('#search').fill(name)) if your app has one.
  async searchProduct(productName) {
    const item = this.page.locator('.inventory_item', {
      has: this.page.locator('.inventory_item_name', { hasText: productName }),
    });
    await item.waitFor({ state: 'visible' });
    return item;
  }

  async sortBy(optionValue) {
    // optionValue examples: 'az', 'za', 'lohi', 'hilo'
    await this.sortDropdown.selectOption(optionValue);
  }

  async addProductToCart(productName) {
    const item = await this.searchProduct(productName);
    await item.locator('button', { hasText: 'Add to cart' }).click();
  }

  async removeProductFromCart(productName) {
    const item = await this.searchProduct(productName);
    await item.locator('button', { hasText: 'Remove' }).click();
  }

  async getCartCount() {
    if (await this.cartBadge.count() === 0) return 0;
    return Number(await this.cartBadge.textContent());
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}

