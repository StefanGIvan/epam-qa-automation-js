const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/home.page');

test.describe('Feature: Practice Software Testing user journeys', () => {
    test('Scenario: Customer can filter and sort products on the main page', async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.open();
        await homePage.filterByCategory('Hand Tools');
        await homePage.sortByPriceLowToHigh();

        await expect(page.getByRole('checkbox', { name: 'Hand Tools' })).toBeChecked();
        await expect(homePage.sortDropdown).toHaveValue('price,asc');
        await expect(homePage.productPrices.first()).toBeVisible();
    });
});