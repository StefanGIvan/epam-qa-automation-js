const homePage = require('../pages/home.page')

describe('Product filter and sort', () => {
  it('Scenario: customer can filter hand tools and sort products by price low to high', () => {
    homePage.visit()

    homePage.openCategoriesMenu()
    homePage.openHandToolsCategory()
    homePage.sortByPriceLowToHigh()

    homePage.getProductNames().should('have.length.greaterThan', 0)
    homePage.getSortDropdown().should('have.value', 'price,asc')
  })
})