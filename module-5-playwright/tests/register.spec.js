const { test, expect } = require('../fixtures/pages.fixtures');
const { createCustomer } = require('../test-data/test-data');

test.describe('Feature: Practice Software Testing user journeys', () => {
    test('Scenario: Customer can create a new account', async ({
        page,
        registerPage,
    }) => {
        const customer = createCustomer();

        await registerPage.open();
        await registerPage.registerNewCustomer(customer);

        await expect(page).toHaveURL(/auth\/login/);
    });
});