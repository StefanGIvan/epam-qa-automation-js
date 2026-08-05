import { BasePage } from './base.page.js';

class ProductPage extends BasePage {
    get productName() {
        return $('[data-test="product-name"]');
    }

    get productPrice() {
        return $('[data-test="unit-price"]');
    }

    get productDescription() {
        return $('[data-test="product-description"]');
    }

    get addToCartButton() {
        return $('[data-test="add-to-cart"]');
    }

    get addToCartSuccessMessage() {
        return $('.toast-message');
    }

    async addToCart() {
        await this.addToCartButton.waitForDisplayed();
        await this.addToCartButton.click();

        await this.addToCartSuccessMessage.waitForDisplayed({
            timeout: 10000,
        });
    }

    async getUnitPrice() {
        await this.productPrice.waitForDisplayed();

        const priceText = await this.productPrice.getText();
        return parseFloat(priceText.replace(/[^0-9.]/g, ''));
    }
}

export default new ProductPage();
