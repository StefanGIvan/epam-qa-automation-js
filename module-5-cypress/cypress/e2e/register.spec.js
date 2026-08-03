const registerPage = require('../pages/register.page');
const { createRegistrationUser } = require('../data/test-data');

describe('Registration', () => {
    it('Scenario: customer can create a new account', () => {
        const user = createRegistrationUser();

        registerPage.openFromHomePage();
        registerPage.fillForm(user);
        registerPage.submit();
        registerPage.assertRedirectedToLoginPage();
    });
});
