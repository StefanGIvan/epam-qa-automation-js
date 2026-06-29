class HomePage {
    constructor(page) {
        this.page = page;

        this.searchInput = page.locator('[data-test="search-query"]');
        this.searchButton = page.locator('[data-test="search-submit"]');
        this.productName = page.locator('[data-test="product-name"]');
        this.productPrices = page.locator('[data-test="product-price"]');
        this.sortDropdown = page.locator('[data-test="sort"]');
    }

    async open() {
        await this.page.goto('/');
    }

    async searchForProduct(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async openProduct(productName) {
        await this.page.getByText(productName, { exact: true }).click();
    }

    async filterByCategory(categoryName) {
        await this.page.getByText(categoryName).check();
    }

    async sortByPriceLowToHigh() {
        await this.sortDropdown.selectOption('price,asc');
    }

    async getProductPrices() {
        const prices = await this.productPrices.allTextContents();

        return prices.map((price) => 
            Number(price.replace('$', '').trim())
        );
    }
}

module.exports = { HomePage }; 