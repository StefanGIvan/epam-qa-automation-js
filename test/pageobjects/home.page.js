class HomePage {
    get productCards() {
            return $$('[data-test="product-name"]');
        }

    get searchInput() {
        return $('[data-test="search-query"]');
    }

    get searchButton() {
        return $('[data-test="search-submit"]');
    }

    async open() {
        await browser.url('/');
    }

    async waitForProductCatalog() {
        await browser.waitUntil(
            async () => {
                const products = await this.productCards;
                return products.length > 0;
            },
            {
                timeout: 10000,
                timeoutMsg: 'Expected at least one product to be displayed'
            }
        );
    }
    
    async searchForProduct(productName) {
        await this.searchInput.waitForDisplayed();
        await this.searchInput.setValue(productName);
        await this.searchButton.click();
    }

    async openProductByName(productName) {
        //normalize-space() removes extra spaces before/after
        const product = await $(`//*[normalize-space()="${productName}"]`);
        await product.waitForDisplayed();
        await product.click();
    }
}

export default new HomePage();