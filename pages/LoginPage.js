const env = require('../utils/env');

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto(env.baseUrl);
  }

  async login(username = env.username, password = env.password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

//   async getErrorText() {
//     return this.errorMessage.textContent();
//   }

  async verifyLoginSuccessful() {
    // After successful login, SauceDemo redirects to /inventory.html
    await this.page.waitForURL('**/inventory.html');
  }
}

