# CirrusNova Automation Test Engineer Assessment

## Overview

This project was created for the CirrusNova Tech Labs Automation Test Engineer technical assessment.

The framework uses:

- Playwright
- JavaScript
- Node.js
- Page Object Model
- Playwright APIRequest fixture
- Environment-based configuration
- Azure DevOps pipeline
- GitHub Actions

---

## Target Applications

### UI

Swag Labs:
https://www.saucedemo.com

Swag Labs was selected because it provides a stable e-commerce workflow suitable for an end-to-end business journey.

The automated business journey is:

Login
→ Browse products
→ Add product to cart
→ Open cart
→ Checkout
→ Enter customer details
→ Complete order
→ Verify successful order

Authentication is treated as a precondition rather than the business journey.

### API

Restful Booker:
https://restful-booker.herokuapp.com

Swag Labs does not provide the public REST API required for this exercise, so Restful Booker is used as the separate public API target.

The API coverage contains:

1. GET booking - validates response status, structure and data types.
2. GET unknown booking - validates the negative/error path.

---

## Project Structure

tests/
- ui/
- api/

pages/
- LoginPage.js
- InventoryPage.js
- CartPage.js
- CheckoutPage.js

config/
- environment.js

.github/
- workflows/
  - tests.yml

azure-pipelines.yml
playwright.config.js
package.json

---

## Prerequisites

- Node.js 20+
- npm

---

## Installation

Clone the repository:

git clone <repository-url>

Navigate into the project:

cd cirrusnova-automation-assessment

Install dependencies:

npm ci

Install Playwright Chromium:

npx playwright install chromium

---

## Environment Configuration

Copy:

.env.example

to:

.env

Example:

UI_BASE_URL=https://www.saucedemo.com
API_BASE_URL=https://restful-booker.herokuapp.com
SWAGLABS_USERNAME=standard_user
SWAGLABS_PASSWORD=secret_sauce
BOOKING_ID=1

Environment-specific values are externalised so that the test code does not need to change when targeting another environment.

The .env file is intentionally excluded from source control.

---

## Running Tests

Run all tests:

npm test

Run UI tests:

npm run test:ui

Run API tests:

npm run test:api

Run tests in headed mode:

npm run test:headed

Run tests in debug mode:

npm run test:debug

Open HTML report:

npm run report

---

## Framework Design

The framework follows the Page Object Model.

Page objects contain:

- Locators
- Page interactions
- Reusable page-level actions

Test files contain:

- Business scenarios
- Assertions
- Test flow

This separation keeps test cases readable and allows locators to be maintained independently from test scenarios.

---

## Locator Strategy

The tests prefer user-facing or stable test identifiers such as:

- getByRole
- getByTestId

This avoids brittle CSS/XPath selectors where possible.

---

## Waiting Strategy

The framework relies on Playwright's built-in auto-waiting and web-first assertions.

Arbitrary sleeps such as:

waitForTimeout()

are intentionally avoided.

---

## API Testing

Playwright's request fixture is used so that API tests run as part of the same Playwright test suite as the UI tests.

The API assertions validate both response status and response payload structure/content.

---

## CI/CD

### Azure DevOps

The repository contains:

azure-pipelines.yml

The pipeline:

1. Installs Node.js.
2. Installs npm dependencies.
3. Installs Playwright Chromium.
4. Runs the test suite.
5. Publishes JUnit test results.
6. Publishes the Playwright HTML report.
7. Retains test artifacts when the pipeline fails.

### GitHub Actions

The repository also contains:

.github/workflows/tests.yml

The GitHub Actions workflow runs on pushes and pull requests to main.

---

## What I Would Improve With More Time

With additional time I would consider:

- Adding more API contract assertions.
- Adding reusable test data builders.
- Adding more negative UI scenarios.
- Improving test data isolation.
- Adding environment-specific CI variables/secrets.
- Adding a small reusable component abstraction for common navigation elements.

---

## AI Usage

AI coding assistance was used as a development aid.

All submitted code was reviewed and understood before submission.

I am able to explain the framework structure, test design, locator strategy, API assertions and CI/CD configuration.

---

## Execution Time

Approximately 4 hours.