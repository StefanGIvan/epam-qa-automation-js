import { assert, chaiExpect } from '../helpers/chai.js';
import HomePage from '../pageobjects/home.page.js';
import ProductPage from '../pageobjects/product.page.js';

describe('Module 2 scenarios automated with WDIO, Mocha and Chai for Module 4 task', () => {
    const searchTerm = 'Combination Pliers';
    const productName = 'Combination Pliers';

    beforeEach(async () => {
        await HomePage.open();
    });

    // Smoke test - verifies that the Toolshop home page loads correctly
    // and that at least one product is displayed in the catalog
    it('[Chai Assert] should display the product catalog on the Home page', async () => {
        const title = await browser.getTitle();

        await HomePage.waitForProductCatalog();

        const products = await HomePage.productCards;

        assert.include(title, 'Practice Software Testing');
        assert.isAbove(products.length, 0, 'Expected at least one product to be displayed');
    });

    // Scenario 1:
    // Customer can search for an exact product and view its details
    it(`[Scenario 1][Chai Should + Expect] should search for "${searchTerm}" and view its product details`, async () => {
        await HomePage.searchForProduct(searchTerm);

        const products = await HomePage.productCards;
        const firstProductName = await products[0].getText();

        products.length.should.be.greaterThan(0);
        firstProductName.should.include(searchTerm);

        await HomePage.openProductByName(productName);

        const actualProductName = await ProductPage.productName.getText();
        const isPriceDisplayed = await ProductPage.productPrice.isDisplayed();
        const isDescriptionDisplayed = await ProductPage.productDescription.isDisplayed();

        chaiExpect(actualProductName).to.equal(productName);
        chaiExpect(isPriceDisplayed).to.be.true;
        chaiExpect(isDescriptionDisplayed).to.be.true;
    });
});