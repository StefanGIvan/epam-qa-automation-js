describe('Product search', () => {
  it('Scenario: customer can search for an exact product and view its details', () => {
    cy.visit('/');

    cy.get('[data-test="search-query"]').type('Combination Pliers');
    cy.get('[data-test="search-submit"]').click();

    cy.contains('Combination Pliers').click();

    cy.contains('Combination Pliers').should('be.visible');
    cy.get('body').should('contain.text', '$');
  })
})