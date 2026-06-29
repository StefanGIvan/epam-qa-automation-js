class HomePage {
    constructor(page) {
        this.page = page;

        this.searchInput = page.locator('[data-test="search-query"]');
        this.searchButton = page.locator('[data-test="search-submit"]');
    }

    async open() {
        await this.page.goto('/');
    }

    async searchForProduct(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async openProduct(productName) {
        await this.page
        // RegExp because the full link name may be not the exact product name
        .getByRole('link', { name: new RegExp(productName) })
        .first()
        .click();
}
}

module.exports = { HomePage };