const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const { createCustomer, products } = require('../business/test-data/test-data');

Given('the customer is on the home page', async function () {
    await this.homePage.open();
});

Given('the customer is on the registration page', async function () {
    await this.registerPage.open();
});

Then('the product catalog should be displayed', async function () {
    const productCards = this.page.locator('[data-test="product-name"]');

    await expect(productCards.first()).toBeVisible({ timeout: 30000 });
});

When('the customer submits valid registration data', async function () {
    const customer = createCustomer();

    await this.registerPage.registerNewCustomer(customer);
});

Then('the customer should be redirected to the login page', async function () {
    await expect(this.page).toHaveURL(/\/auth\/login/);
});

When('the customer searches for {string}', async function (productName) {
    await this.homePage.searchForProduct(productName);
});

When('the customer opens product {string}', async function (productName) {
    await this.homePage.openProduct(productName);
});

Then('the product details for {string} should be displayed', async function (productName) {
    const product = Object.values(products).find((item) => item.name === productName);

    await expect(this.productPage.productTitle(productName)).toBeVisible();

    if (product?.price) {
        await expect(this.productPage.productPrice(product.price)).toBeVisible();
    }

    if (product?.description) {
        await expect(this.productPage.productDescription(product.description)).toBeVisible();
    }
});

When('the customer filters products by category {string}', async function (categoryName) {
    await this.homePage.filterByCategory(categoryName);
});

When('the customer sorts products by price low to high', async function () {
    await this.homePage.sortByPriceLowToHigh();
});

Then('product prices should be sorted from low to high', async function () {
    await expect
        .poll(
            async () => {
                const prices = await this.homePage.getProductPrices();

                return (
                    prices.length > 0 &&
                    prices.every((price, index, array) => {
                        return index === 0 || price >= array[index - 1];
                    })
                );
            },
            {
                timeout: 10000,
                message: 'Expected product prices to be sorted from low to high',
            }
        )
        .toBe(true);
});

When(
    'the customer adds {string} to the cart with quantity {int}',
    async function (productName, quantity) {
        await this.homePage.searchForProduct(productName);
        await this.homePage.openProduct(productName);
        await this.productPage.addProductToCartWithQuantity(quantity);
    }
);

When('the customer opens the cart', async function () {
    await this.cartPage.open();
});

Then('the cart should contain {string}', async function (productName) {
    await expect(this.cartPage.productByName(productName)).toBeVisible();
});

Then('the cart quantity for {string} should be {string}', async function (productName, quantity) {
    await expect(this.cartPage.quantityInput(productName)).toHaveValue(quantity);
});

Then(
    'the cart line price for {string} should be {string}',
    async function (productName, linePrice) {
        await expect(this.cartPage.lineTotalForProduct(productName)).toContainText(linePrice);
    }
);
