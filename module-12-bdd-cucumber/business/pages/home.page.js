const { BasePage } = require('./base.page');

class HomePage extends BasePage {
    constructor(page) {
        super(page);

        this.searchInput = page.locator('[data-test="search-query"]');
        this.searchButton = page.locator('[data-test="search-submit"]');

        this.sortDropdown = page.locator('[data-test="sort"]');
        this.productPrices = page.locator('.card [data-test="product-price"]');
    }

    async open() {
        await super.open('/');
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

    categoryCheckbox(categoryName) {
        return this.page.getByRole('checkbox', { name: categoryName });
    }

    async sortByPriceLowToHigh() {
        await this.sortDropdown.selectOption({ value: 'price,asc' });
    }

    async getProductPrices() {
        const prices = await this.productPrices.allTextContents();

        return prices.map((price) => parseFloat(price.replace('$', '').trim()));
    }
}

module.exports = { HomePage };
