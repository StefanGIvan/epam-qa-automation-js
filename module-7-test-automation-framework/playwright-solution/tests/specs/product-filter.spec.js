const { test, expect } = require('../../business/fixtures/pages.fixtures');
const { filters } = require('../../business/test-data/test-data');

test.describe('Feature: Practice Software Testing user journeys', () => {
    test('Scenario: Customer can filter and sort products on the main page', async ({
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
