const registerPage = require('../pages/register.page')

describe('Registration', () => {
  it('Scenario: customer can create a new account', () => {
    const timestamp = Date.now()

    const user = {
      firstName: 'Stefan',
      lastName: 'Test',
      dateOfBirth: '1997-02-20',
      country: 'Romania',
      postalCode: '010101',
      houseNumber: '42',
      street: 'Test Street',
      city: 'Bucharest',
      state: 'Bucharest',
      phone: '0712345678',
      email: `stefan.${timestamp}@example.com`,
      password: `SafePass-${timestamp}!Aa1`,
    }

    registerPage.openFromHomePage()
    registerPage.fillForm(user)
    registerPage.submit()
    registerPage.assertRedirectedToLoginPage()
  })
})