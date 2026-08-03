const homePage = require('../pages/home.page');
const productPage = require('../pages/product.page');
const { products } = require('../data/test-data');

describe('Product search', () => {
    it('Scenario: customer can search for an exact product and view its details', () => {
        const product = products.combinationPliers;

        homePage.visit();
        homePage.searchForProduct(product.name);
        homePage.openProduct(product.name);

        productPage.assertProductPageIsOpened(product.name);

        cy.contains(product.price).should('be.visible');
        cy.contains(product.description).should('be.visible');
    });
});
