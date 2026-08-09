const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

const { HomePage } = require('../business/pages/home.page');
const { ProductPage } = require('../business/pages/product.page');
const { CartPage } = require('../business/pages/cart.page');
const { RegisterPage } = require('../business/pages/register.page');

setDefaultTimeout(120000);

Before(async function () {
    this.browser = await chromium.launch({
        headless: true,
    });

    this.context = await this.browser.newContext({
        baseURL: 'https://practicesoftwaretesting.com',
    });

    this.page = await this.context.newPage();

    this.homePage = new HomePage(this.page);
    this.productPage = new ProductPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.registerPage = new RegisterPage(this.page);
});

After(async function () {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
});
