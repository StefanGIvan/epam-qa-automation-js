class HomePage {
    visit() {
        cy.visit('/');
    }

    searchForProduct(productName) {
        cy.get('[data-test="search-query"]').clear().type(productName);
        cy.get('[data-test="search-submit"]').click();
    }

    openProduct(productName) {
        cy.get('[data-test="product-name"]').contains(productName).click();
    }

    openCategoriesMenu() {
        cy.get('[data-test="nav-categories"]').click();
    }

    openHandToolsCategory() {
        cy.get('[data-test="nav-hand-tools"]').click();
    }

    sortBy(sortValue) {
        cy.get('[data-test="sort"]').select(sortValue);
    }

    getProductNames() {
        return cy.get('[data-test="product-name"]');
    }

    getSortDropdown() {
        return cy.get('[data-test="sort"]');
    }
}

module.exports = new HomePage();
