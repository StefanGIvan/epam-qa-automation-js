const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/home.page');

test.describe('Feature: Practice Software Testing user journeys', () => {
    test('Scenario: Customer can filter and sort products on the main page', async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.open();
        await homePage.filterByCategory('Hand Tools');
        await homePage.sortByPriceLowToHigh();

        await expect.poll(async () => {
            const displayedPrices = await homePage.getProductPrices();

            // Make a copy of the original array and sort prices low to high
            const sortedPrices = [...displayedPrices].sort((firstPrice, secondPrice) => firstPrice - secondPrice);

            return displayedPrices.join(',') === sortedPrices.join(',');
        }).toBe(true);
    });
});