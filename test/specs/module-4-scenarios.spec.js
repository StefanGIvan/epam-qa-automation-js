import { assert, chaiExpect } from '../helpers/chai.js';
import HomePage from '../pageobjects/home.page.js';
import ProductPage from '../pageobjects/product.page.js';
import CartPage from '../pageobjects/cart.page.js'
import RegisterPage from '../pageobjects/register.page.js';

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
        await HomePage.waitForProductWithName(productName);

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

    // Scenario 2:
    // Customer can filter and sort products on the main page
    it('[Scenario 2][Chai Expect] should filter Hand Tools and sort products by prices low to high', async () => {
        await HomePage.filterByHandTools();
        await HomePage.sortByPricesLowToHigh();
        await HomePage.waitForPricesToBeSortedLowToHigh();

        const prices = await HomePage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);

        chaiExpect(prices.length).to.be.greaterThan(0);
        chaiExpect(prices).to.deep.equal(sortedPrices);
    });

    // Scenario 3:
    // Customer can add a product to the basket and change quantity
    it('[Scenario 3][Chai Expect] should add Thor Hammer to basket and change quantity to 2', async() => {
        const productName = 'Thor Hammer';
        const quantity = '2';
        const unitPrice = 11.14;
        const expectedTotalPrice = unitPrice * Number(quantity);

        await HomePage.searchForProduct(productName);
        await HomePage.waitForProductWithName(productName);
        await HomePage.openProductByName(productName);

        await ProductPage.addToCart();

        await browser.pause(1000);

        await CartPage.open();
        await CartPage.quantityInput.waitForDisplayed({ timeout: 15000 });

        await CartPage.changeQuantity(quantity);
        await CartPage.waitForLinePrice(expectedTotalPrice);

        const cartProductTitle = await CartPage.getProductTitle();
        const cartQuantity = await CartPage.getQuantity();
        const actualTotalPrice = await CartPage.getLinePrice();

        chaiExpect(cartProductTitle.trim()).to.equal(productName);
        chaiExpect(cartQuantity).to.equal(quantity);
        chaiExpect(actualTotalPrice).to.equal(expectedTotalPrice);
    });

    // Scenario 4:
    // Customer can create a new account
    it('[Scenario 4][Chai Expect] should create a new customer account', async () => {
        const email = `testuser${Date.now()}@mail.com`;

        const customer = {
            firstName: 'Test',
            lastName: 'User',
            dateOfBirth: '1995-05-20',
            country: 'Romania',
            postalCode: '010101',
            houseNumber: '12',
            street: 'Test Street',
            city: 'Bucharest',
            state: 'Bucharest',
            phone: '0712345678',
            email,
            password: `StrongTest${Date.now()}!Aa`
        };

        await RegisterPage.open();
        await RegisterPage.registerNewCustomer(customer);
        await RegisterPage.waitForRedirectToLoginPage();

        const currentUrl = await browser.getUrl();
        chaiExpect(currentUrl).to.include('/auth/login');
    });
});