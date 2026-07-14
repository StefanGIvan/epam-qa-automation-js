const homePage = require('../pages/home.page')
const productPage = require('../pages/product.page')

describe('Product search', () => {
  it('Scenario: customer can search for an exact product and view its details', () => {
    const productName = 'Combination Pliers'

    homePage.visit()
    homePage.searchForProduct(productName)
    homePage.openProduct(productName)

    productPage.assertProductPageIsOpened(productName)

    cy.contains('$14.15').should('be.visible')
    cy.contains('Versatile combination pliers').should('be.visible')
  })
})