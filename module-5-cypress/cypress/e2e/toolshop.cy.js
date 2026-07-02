describe('Practice Software Testing Toolshop', () => {
  it('opens the Toolshop home page', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.title().should('include', 'Practice Software Testing')
    cy.url().should('include', 'practicesoftwaretesting.com')
  })
})