const { test, expect } = require('../fixtures/pages.fixtures');
const { filters } = require('../test-data/test-data');

test.describe('Feature: Practice Software Testing user journeys', () => {
    test('Scenario: Customer can filter and sort products on the main page', async ({
        page,
        homePage,
    }) => {
        const filter = filters.handTools;

        await homePage.open();
        await homePage.filterByCategory(filter.categoryName);
        await homePage.sortByPriceLowToHigh();

        await expect(homePage.categoryCheckbox(filter.categoryName)).toBeChecked();
        await expect(homePage.sortDropdown).toHaveValue(filter.sortValue);
        await expect(homePage.productPrices.first()).toBeVisible();
    });
});