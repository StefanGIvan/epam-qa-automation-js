class HomePage {
    constructor(page) {
        this.page = page;

        this.searchInput = page.locator('[data-test="search-query"]');
        this.searchButton = page.locator('[data-test="search-submit"]');

        this.sortDropdown = page.locator('[data-test="sort"]');
        this.productPrices = page.locator('.card [data-test="product-price"]');
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

    async filterByCategory(categoryName) {
        await this.page.getByRole('checkbox', { name: categoryName }).check();
    }

    async sortByPriceLowToHigh() {
        await this.sortDropdown.selectOption({ label: 'Price (Low - High)' });
    }

    async getProductPrices() {
        const prices = await this.productPrices.allTextContents();

        return prices.map((price) =>
        Number(price.replace('$', '').trim())
        );
    }
}

module.exports = { HomePage };