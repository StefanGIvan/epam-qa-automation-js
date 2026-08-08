const { test: base, expect } = require('@playwright/test');

const { HomePage } = require('../pages/home.page');
const { ProductPage } = require('../pages/product.page');
const { CartPage } = require('../pages/cart.page');
const { RegisterPage } = require('../pages/register.page');

const test = base.extend({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
});

module.exports = {
    test,
    expect,
};
