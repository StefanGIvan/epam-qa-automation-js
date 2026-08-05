class RegisterPage {
    openFromHomePage() {
        cy.visit('/');
        cy.contains('Sign in').click();
        cy.contains('Register your account').click();
    }

    fillForm(user) {
        cy.get('[data-test="first-name"]').clear().type(user.firstName);
        cy.get('[data-test="last-name"]').clear().type(user.lastName);
        cy.get('[data-test="dob"]').clear().type(user.dateOfBirth);
        cy.get('[data-test="country"]').select(user.country);
        cy.get('[data-test="postal_code"]').clear().type(user.postalCode);
        cy.get('[data-test="house_number"]').clear().type(user.houseNumber);
        cy.get('[data-test="street"]').clear().type(user.street);
        cy.get('[data-test="city"]').clear().type(user.city);
        cy.get('[data-test="state"]').clear().type(user.state);
        cy.get('[data-test="phone"]').clear().type(user.phone);
        cy.get('[data-test="email"]').clear().type(user.email);
        cy.get('[data-test="password"]').clear().type(user.password);
    }

    submit() {
        cy.get('[data-test="register-submit"]').click();
    }

    assertRedirectedToLoginPage() {
        cy.location('pathname', { timeout: 15000 }).should('eq', '/auth/login');
        cy.get('[data-test="email"]').should('be.visible');
    }
}

module.exports = new RegisterPage();
