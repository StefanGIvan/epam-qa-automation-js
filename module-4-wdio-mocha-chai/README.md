# WDIO Mocha Chai Automation Framework

This project contains automated end-to-end tests for the **Practice Software Testing - Toolshop** application.

The framework was built using **WebdriverIO**, **Mocha** and **Chai** as part of Module 4 JavaScript automation testing task.

## Tech Stack

* JavaScript
* WebdriverIO
* Mocha
* Chai
* Chrome browser

## Project Purpose

The goal of this project is to practice building an automation framework with WebdriverIO and Mocha, while using the three Chai assertion interfaces:

* `Assert`
* `Should`
* `Expect`

The tests automate selected user journeys from Module 2 testing scenarios.

## Automated Scenarios

The project includes one smoke test and four automated user scenarios.

### Smoke Test

* Verifies that the home page loads correctly.
* Checks that the product catalog is displayed.

### Scenario 1: Search Product and View Details

* Searches for an exact product: `Combination Pliers`.
* Opens the product details page.
* Verifies that the product name, price and description are displayed.

### Scenario 2: Filter and Sort Products

* Filters products by `Hand Tools`.
* Sorts the filtered products by price from low to high.
* Verifies that the displayed prices are sorted correctly.

### Scenario 3: Add Product to Basket and Change Quantity

* Searches for `Thor Hammer`.
* Opens the product page.
* Adds the product to the basket.
* Changes the quantity to `2`.
* Verifies the product title, quantity, and line price in the basket.

### Scenario 4: Create a New Customer Account

* Opens the registration page.
* Fills in valid customer details.
* Generates a unique email and password for each test run.
* Submits the registration form.
* Verifies that the user is redirected to the login page.

## Project Structure

```text
test/
  helpers/
    chai.js

  pageobjects/
    cart.page.js
    home.page.js
    product.page.js
    register.page.js

  specs/
    module-4-scenarios.spec.js

wdio.conf.js
package.json
README.md
```

## How to Install

Install project dependencies:

```bash
npm install
```

## How to Run Tests

Run the full test suite:

```bash
npx wdio run ./wdio.conf.js
```

## Notes

* The tests use the Page Object Model pattern to keep selectors and page actions separated from test logic.
* Dynamic data is used for account registration to avoid duplicate email issues.
* A generated password is used to avoid common or leaked password validation errors.
* The basket scenario includes a short wait after adding a product to the cart to avoid timing issues with the application state.