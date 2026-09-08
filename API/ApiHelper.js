const { request } = require('@playwright/test');
const env = require('../utils/env');

/**
 * Generic API helper wrapping Playwright's APIRequestContext.
 *
 * NOTE: saucedemo.com is a UI-only demo site with no public REST API,
 * so there is nothing real to call for login/cart/checkout there.
 * This file is structured so that as soon as you point API_BASE_URL
 * (in .env) at a real backend, every method below works unchanged -
 * just update the paths/payloads to match that API's contract.
 */
exports.ApiHelper = class ApiHelper {
  async init(baseURL = env.apiBaseUrl) {
    this.context = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        ...(env.apiKey ? { Authorization: `Bearer ${env.apiKey}` } : {}),
      },
    });
    return this.context;
  }

  async dispose() {
    if (this.context) await this.context.dispose();
  }

  // ---- Example CRUD-style wrappers -----------------------------------
  async get(path, params = {}) {
    const res = await this.context.get(path, { params });
    return this._handle(res);
  }

  async post(path, data = {}) {
    const res = await this.context.post(path, { data });
    return this._handle(res);
  }

  async put(path, data = {}) {
    const res = await this.context.put(path, { data });
    return this._handle(res);
  }

  async delete(path) {
    const res = await this.context.delete(path);
    return this._handle(res);
  }

  // ---- Example step-style methods, mirroring the UI flow -------------
  // Swap the paths/payloads for your real endpoints once available.

  async login(username = env.username, password = env.password) {
    return this.post('/api/login', { username, password });
  }

  async getProducts() {
    return this.get('/api/products');
  }

  async addToCart(productId, quantity = 1) {
    return this.post('/api/cart', { productId, quantity });
  }

  async checkout(userDetails) {
    return this.post('/api/checkout', userDetails);
  }

  async placeOrder(orderPayload) {
    return this.post('/api/orders', orderPayload);
  }

  async _handle(res) {
    const status = res.status();
    let body;
    try {
      body = await res.json();
    } catch {
      body = await res.text();
    }
    return { status, ok: res.ok(), body };
  }
}

