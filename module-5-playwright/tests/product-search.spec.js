const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/home.page');
const { ProductPage } = require('../pages/product.page');

test.describe('Feature: Practice Software Testing user journeys', () => {
    test('Scenario: Customer can search for an exact product and view its details', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);

        const productName = 'Combination Pliers';

        await homePage.open();
        await homePage.searchForProduct(productName);
        await homePage.openProduct(productName);

        await expect(productPage.productTitle(productName)).toBeVisible();
        await expect(productPage.productPrice('$14.15')).toBeVisible();
        await expect(productPage.productDescription('Versatile combination pliers designed for gripping, bending, and cutting wire with ease.')).toBeVisible();
    });
});