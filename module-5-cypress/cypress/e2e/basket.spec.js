const homePage = require('../pages/home.page')
const productPage = require('../pages/product.page')
const cartPage = require('../pages/cart.page')

describe('Basket', () => {
  it('Scenario: customer can add a product to the basket and change quantity', () => {
    const productName = 'Combination Pliers'

    homePage.visit()
    homePage.searchForProduct(productName)
    homePage.openProduct(productName)

    productPage.assertProductPageIsOpened(productName)
    productPage.addToCart()

    cartPage.open()
    cartPage.assertProductIsInCart(productName)
    cartPage.changeQuantity('2')
    cartPage.assertQuantityIs('2')
  })
})