import { assert, chaiExpect } from '../helpers/chai.js';
import HomePage from '../pageobjects/home.page.js';
import ProductPage from '../pageobjects/product.page.js';

describe('Module 2 scenarios automated with WDIO, Mocha and Chai for Module 4 task', () => {
    const searchTerm = 'Combination Pliers';
    const productName = 'Combination Pliers';

    beforeEach(async () => {
        await HomePage.open();
    });

    it('[Chai Assert] should display the product catalog on the Home page', async () => {
        const title = await browser.getTitle();

        await HomePage.waitForProductCatalog();

        const products = await HomePage.productCards;

        assert.include(title, 'Practice Software Testing');
        assert.isAbove(products.length, 0, 'Expected at least one product to be displayed');
    });

    it(`[Chai Should] should show products matching the exact search term "${searchTerm}"`, async () => {
        await HomePage.searchForProduct(searchTerm);

        const products = await HomePage.productCards;
        const firstProductName = await products[0].getText();

        products.length.should.be.greaterThan(0);
        firstProductName.should.include(searchTerm);
    });

    it(`[Chai Expect] should show details for "${productName}"`, async () => {
        await HomePage.openProductByName(productName);

        const actualProductName = await ProductPage.productName.getText();
        const isPriceDisplayed = await ProductPage.productPrice.isDisplayed();
        const isDescriptionDisplayed = await ProductPage.productDescription.isDisplayed();

        chaiExpect(actualProductName).to.equal(productName);
        chaiExpect(isPriceDisplayed).to.be.true;
        chaiExpect(isDescriptionDisplayed).to.be.true;
    });
});