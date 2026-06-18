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
        // Finds the product card title
        // normalize-space() removes extra spaces before/after
        const product = await $(`//h5[@data-test="product-name" and normalize-space()="${productName}"]/ancestor::a`);
        await product.waitForDisplayed();
        await product.click();
    }

    get handToolsCategory() {
        return $('//label[contains(normalize-space(), "Hand Tools")]');
    }

    get sortDropdown() {
        return $('[data-test="sort"]');
    }

    get productPrices() {
        return $$('[data-test="product-price"]');
    }

    async filterByHandTools() {
        await this.handToolsCategory.waitForDisplayed();
        await this.handToolsCategory.click();

        await this.waitForProductCatalog();
    }

    async sortByPricesLowToHigh() {
        await this.sortDropdown.waitForDisplayed();
        await this.sortDropdown.selectByAttribute('value', 'price,asc');
    }

    async getProductPrices() {
    const priceElements = await this.productPrices;
    const prices = [];

    for (let i = 0; i < priceElements.length; i++) {
        const priceText = await priceElements[i].getText();
        prices.push(Number(priceText.replace(/[^0-9.]/g, '')));
    }

    return prices;
}

    async waitForPricesToBeSortedLowToHigh() {
        await browser.waitUntil(
            async () => {
                const prices = await this.getProductPrices();

                return prices.length > 0 && prices.every((price, index, array) => {
                    return index === 0 || price >= array [index - 1];
                });
            },
            {
                timeout: 10000,
                timeoutMsg: 'Expected product prices to be sorted from low to high'
            }
        );
    }

    async waitForProductWithName(productName) {
    await browser.waitUntil(
        async () => {
            const products = await this.productCards;

            for (let i = 0; i < products.length; i++) {
                const text = await products[i].getText();

                if (text.trim() === productName) {
                    return true;
                }
            }

            return false;
        },
        {
            timeout: 15000,
            timeoutMsg: `Expected product "${productName}" to be displayed`
        }
    );
}
}

export default new HomePage();