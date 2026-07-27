# Module 5 - Playwright UI Automation

This module contains Playwright tests for the Practice Software Testing Toolshop application.

Application under test:

https://practicesoftwaretesting.com/

## Implemented Scenarios

The tests automate 4 BDD scenarios from Module 2:

1. Customer can create a new account
2. Customer can search for an exact product and view its details
3. Customer can filter and sort products on the main page
4. Customer can add a product to the basket and change quantity

## Project Structure

```text
pages/
  register.page.js
  home.page.js
  product.page.js
  cart.page.js

tests/
  register.spec.js
  product-search.spec.js
  product-filter.spec.js
  cart.spec.js

playwright.config.js