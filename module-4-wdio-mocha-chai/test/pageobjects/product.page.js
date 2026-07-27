// Page Object for product details page
// Contains selectors and actions related to viewing product details and adding products to the cart

class ProductPage {
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

    async addToCart() {
        await this.addToCartButton.waitForDisplayed();
        await this.addToCartButton.click();
    }
}

export default new ProductPage();