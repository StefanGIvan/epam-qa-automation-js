const homePage = require('../pages/home.page');
const { sorting } = require('../data/test-data');

describe('Product filter and sort', () => {
    it('Scenario: customer can filter hand tools and sort products by price low to high', () => {
        homePage.visit();

        homePage.openCategoriesMenu();
        homePage.openHandToolsCategory();
        homePage.sortBy(sorting.priceLowToHigh);

        homePage.getProductNames().should('have.length.greaterThan', 0);
        homePage.getSortDropdown().should('have.value', sorting.priceLowToHigh);
    });
});
