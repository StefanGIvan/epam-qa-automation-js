describe('Basket', () => {
  it('Scenario: customer can add a product to the basket and change quantity', () => {
    cy.visit('/')

    cy.get('[data-test="search-query"]').type('Combination Pliers')
    cy.get('[data-test="search-submit"]').click()

    cy.get('[data-test="product-name"]')
      .contains('Combination Pliers')
      .click()

    cy.url().should('include', '/product/')
    cy.contains('h1', 'Combination Pliers').should('be.visible')

    cy.contains(/add to cart/i).click()

    cy.get('[data-test="nav-cart"]').click()

    cy.contains('Combination Pliers').should('be.visible')

    cy.get('[data-test="product-quantity"]').clear().type('2')
    cy.get('[data-test="product-quantity"]').should('have.value', '2')
  })
})