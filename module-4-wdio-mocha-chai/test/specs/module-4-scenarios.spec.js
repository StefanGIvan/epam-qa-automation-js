import { assert, chaiExpect } from '../helpers/chai.js';
import { createCustomer } from '../data/customer.data.js';

import homePage from '../pageobjects/home.page.js';
import productPage from '../pageobjects/product.page.js';
import cartPage from '../pageobjects/cart.page.js';
import registerPage from '../pageobjects/register.page.js';

describe('Practice Software Testing user journeys', () => {
    const searchTerm = 'Combination Pliers';
    const productName = 'Combination Pliers';

    beforeEach(async () => {
        await homePage.open();
    });

    it('[Chai Assert] should display the product catalog on the Home page', async () => {
        const title = await browser.getTitle();

        await homePage.waitForProductCatalog();

        const products = await homePage.productCards;

        assert.include(title, 'Practice Software Testing');
        assert.isAbove(products.length, 0, 'Expected at least one product to be displayed');
    });

    it('[Chai Expect] should create a new customer account', async () => {
        const customer = createCustomer();

        await registerPage.open();
        await registerPage.registerNewCustomer(customer);
        await registerPage.waitForRedirectToLoginPage();

        const currentUrl = await browser.getUrl();

        chaiExpect(currentUrl).to.include('/auth/login');
    });

    it(`[Chai Should + Expect] should search for "${searchTerm}" and view its product details`, async () => {
        await homePage.searchForProduct(searchTerm);
        await homePage.waitForProductWithName(productName);

        const products = await homePage.productCards;
        const firstProductName = await products[0].getText();

        products.length.should.be.greaterThan(0);
        firstProductName.should.include(searchTerm);

        await homePage.openProductByName(productName);

        const actualProductName = await productPage.productName.getText();
        const isPriceDisplayed = await productPage.productPrice.isDisplayed();
        const isDescriptionDisplayed = await productPage.productDescription.isDisplayed();

        chaiExpect(actualProductName).to.equal(productName);
        chaiExpect(isPriceDisplayed).to.be.true;
        chaiExpect(isDescriptionDisplayed).to.be.true;
    });

    it('[Chai Expect] should filter Hand Tools and sort products by prices low to high', async () => {
        await homePage.filterByHandTools();
        await homePage.sortByPricesLowToHigh();
        await homePage.waitForPricesToBeSortedLowToHigh();

        const prices = await homePage.getProductPrices();
        const sortedPrices = [...prices].sort(
            (firstPrice, secondPrice) => firstPrice - secondPrice
        );

        chaiExpect(prices.length).to.be.greaterThan(0);
        chaiExpect(prices).to.deep.equal(sortedPrices);
    });

    it('[Chai Expect] should add Thor Hammer to basket and change quantity to 2', async () => {
        const productName = 'Thor Hammer';
        const quantity = '2';
        const quantityNumber = parseInt(quantity, 10);

        await homePage.searchForProduct(productName);
        await homePage.waitForProductWithName(productName);
        await homePage.openProductByName(productName);

        const unitPrice = await productPage.getUnitPrice();
        const expectedTotalPrice = unitPrice * quantityNumber;

        await productPage.addToCart();

        await cartPage.open();
        await cartPage.waitForProductInCart();

        await cartPage.changeQuantity(quantity);
        await cartPage.waitForLinePrice(expectedTotalPrice);

        const cartProductTitle = await cartPage.getProductTitle();
        const cartQuantity = await cartPage.getQuantity();
        const actualTotalPrice = await cartPage.getLinePrice();

        chaiExpect(cartProductTitle.trim()).to.equal(productName);
        chaiExpect(cartQuantity).to.equal(quantity);
        chaiExpect(actualTotalPrice).to.be.closeTo(expectedTotalPrice, 0.01);
    });
});
