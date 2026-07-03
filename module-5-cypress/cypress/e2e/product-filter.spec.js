describe('Product filter and sort', () => {
    it('Scenario: customer can filter hand tools and sort products by price low to high', () => {
        cy.visit('/')

        cy.get('[data-test="nav-categories"]').click()
        cy.get('[data-test="nav-hand-tools"]').click()
        cy.get('[data-test="sort"]').select('price,asc')

        cy.get('[data-test="product-name"]').should('have.length.greaterThan', 0)
        cy.get('[data-test="sort"]').should('have.value', 'price,asc')
    })
})