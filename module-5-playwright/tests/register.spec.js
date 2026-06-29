const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/register.page');

test.describe('Feature: Practice Software Testing user journeys', () => {
    test('Scenario: Customer can create a new account', async ({ page }) => {
        const registerPage = new RegisterPage(page);

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
            email: `testuser${Date.now()}@mail.com`,
            password: `StrongPass${Date.now()}!Aa`
        };

         await registerPage.open();
        await registerPage.registerNewCustomer(customer);

        await expect(page).toHaveURL(/auth\/login/);
});
});