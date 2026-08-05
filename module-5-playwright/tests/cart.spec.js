const { test, expect } = require('../fixtures/pages.fixtures');
const { products } = require('../test-data/test-data');

test.describe('Feature: Practice Software Testing user journeys', () => {
    test('Scenario: Customer can add a product to the basket and change quantity', async ({
        homePage,
        productPage,
        cartPage,
    }) => {
        const product = products.boltCutters;

        await homePage.open();
        await homePage.searchForProduct(product.name);
        await homePage.openProduct(product.name);

        await productPage.addToCart();
        await cartPage.open();
        await cartPage.setQuantity(product.name, product.cartQuantity);

        await expect(cartPage.productByName(product.name)).toBeVisible();
        await expect(cartPage.quantityInput(product.name)).toHaveValue(product.expectedQuantity);
        await expect(cartPage.lineTotalForProduct(product.name)).toHaveText(
            product.expectedLinePrice
        );
    });
});
