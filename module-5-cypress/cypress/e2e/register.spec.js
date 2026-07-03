describe('Registration', () => {
  it('Scenario: customer can create a new account', () => {
    const timestamp = Date.now()
    const email = `stefan.${timestamp}@example.com`
    const password = `SafePass-${timestamp}!Aa1`

    cy.visit('/')

    cy.contains('Sign in').click()
    cy.contains('Register your account').click()

    cy.get('[data-test="first-name"]').type('Stefan')
    cy.get('[data-test="last-name"]').type('Test')
    cy.get('[data-test="dob"]').type('1997-02-20')
    cy.get('[data-test="country"]').select('Romania')
    cy.get('[data-test="postal_code"]').type('010101')
    cy.get('[data-test="house_number"]').type('42')
    cy.get('[data-test="street"]').type('Test Street')
    cy.get('[data-test="city"]').type('Bucharest')
    cy.get('[data-test="state"]').type('Bucharest')
    cy.get('[data-test="phone"]').type('0712345678')
    cy.get('[data-test="email"]').type(email)
    cy.get('[data-test="password"]').type(password)

    cy.get('[data-test="register-submit"]').click()

    cy.location('pathname', { timeout: 15000 }).should('eq', '/auth/login')
    cy.get('[data-test="email"]').should('be.visible')
  })
})