const homePage = require('../pages/home.page')
const productPage = require('../pages/product.page')
const cartPage = require('../pages/cart.page')
const { products, cart } = require('../data/test-data')

describe('Basket', () => {
  it('Scenario: customer can add a product to the basket and change quantity', () => {
    const product = products.combinationPliers

    homePage.visit()
    homePage.searchForProduct(product.name)
    homePage.openProduct(product.name)

    productPage.assertProductPageIsOpened(product.name)
    productPage.addToCart()

    cartPage.open()
    cartPage.assertProductIsInCart(product.name)
    cartPage.changeQuantity(cart.quantity)
    cartPage.assertQuantityIs(cart.quantity)
  })
})