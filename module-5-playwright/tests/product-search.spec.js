const { test, expect } = require('../fixtures/pages.fixtures');
const { products } = require('../test-data/test-data');

test.describe('Feature: Practice Software Testing user journeys', () => {
    test('Scenario: Customer can search for an exact product and view its details', async ({
        homePage,
        productPage,
    }) => {
        const product = products.combinationPliers;

        await homePage.open();
        await homePage.searchForProduct(product.name);
        await homePage.openProduct(product.name);

        await expect(productPage.productTitle(product.name)).toBeVisible();
        await expect(productPage.productPrice(product.price)).toBeVisible();
        await expect(productPage.productDescription(product.description)).toBeVisible();
    });
});