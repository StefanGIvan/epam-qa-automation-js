class ProductPage {
  assertProductPageIsOpened(productName) {
    cy.location('pathname').should('include', '/product/')
    cy.contains('h1', productName).should('be.visible')
  }

  addToCart() {
    cy.contains(/add to cart/i).click()
  }
}

module.exports = new ProductPage()