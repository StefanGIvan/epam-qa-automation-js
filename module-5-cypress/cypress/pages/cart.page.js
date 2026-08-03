class CartPage {
    open() {
        cy.get('[data-test="nav-cart"]').click();
    }

    assertProductIsInCart(productName) {
        cy.contains(productName).should('be.visible');
    }

    changeQuantity(quantity) {
        cy.get('[data-test="product-quantity"]').clear().type(quantity);
    }

    assertQuantityIs(quantity) {
        cy.get('[data-test="product-quantity"]').should('have.value', quantity);
    }
}

module.exports = new CartPage();
