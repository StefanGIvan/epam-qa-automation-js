const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/home.page');
const { ProductPage } = require('../pages/product.page');
const { CartPage } = require('../pages/cart.page');

test.describe('Feature: Practice Software Testing user journeys', () => {
    test('Scenario: Customer can add a product to the basket and change quantity', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        const productName = 'Bolt Cutters';
        const expectedQuantity = '2';
        const expectedLinePrice = '$96.82';

        await homePage.open();
        await homePage.searchForProduct(productName);
        await homePage.openProduct(productName);

        await productPage.addToCart();
        await cartPage.open();
        await cartPage.setQuantity(productName, 2);

        await expect(cartPage.productByName(productName)).toBeVisible();
        await expect(cartPage.quantityInput(productName)).toHaveValue(expectedQuantity);
        await expect(cartPage.lineTotalForProduct(productName)).toHaveText(expectedLinePrice);
    });
});