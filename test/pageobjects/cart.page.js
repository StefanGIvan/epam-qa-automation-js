class CartPage {
    get productTitle() {
        return $('[data-test="product-title"]');
    }

    get quantityInput() {
        return $('[data-test="product-quantity"]');
    }

    get linePrice() {
        return $('[data-test="line-price"]');
    }

    async open() {
        await browser.url('/checkout');
    }

    async changeQuantity(quantity) {
        await this.quantityInput.waitForDisplayed();
        await this.quantityInput.setValue(quantity);
    }

    async getProductTitle() {
        await this.productTitle.waitForDisplayed();
        return this.productTitle.getText();
    }

    async getQuantity() {
        await this.quantityInput.waitForDisplayed();
        return this.quantityInput.getValue();
    }

    async getLinePrice() {
        await this.linePrice.waitForDisplayed();

        const priceText = await this.linePrice.getText();
        return Number(priceText.replace(/[^0-9.]/g, ''));
    }

    async waitForLinePrice(expectedPrice) {
        await browser.waitUntil(
            async () => {
                const actualPrice = await this.getLinePrice();
                return actualPrice === expectedPrice;
            },
            {
                timeout: 10000,
                timeoutMsg: `Expected line price to be ${expectedPrice}`,
            }
        );
    }
}

export default new CartPage();