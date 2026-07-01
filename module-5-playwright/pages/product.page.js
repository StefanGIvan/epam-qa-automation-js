class ProductPage {
    constructor(page) {
        this.page = page;
    }

    // Find the product title by heading
        productTitle(productName) {
            return this.page.getByRole('heading', { name: productName, level: 1 });
        }

        // Find the product price by visible text
        productPrice(price) {
            return this.page.getByText(price);
        }

        // Find the product description by visible text
        productDescription(description) {
            return this.page.getByText(description);
        }

        async increaseQuantity() {
            await this.page.getByRole('button', { name: 'Increase quantity' }).click();
        }

        async addToCart() {
            await this.page.locator('[data-test="add-to-cart"]').click();

            // The cart icon appears only after a product is added.
            await this.page.locator('[data-test="nav-cart"]').waitFor({ state: 'visible' });
        }

        async addProductToCartWithQuantity(quantity) {
            for (let currentQuantity = 1; currentQuantity < quantity; currentQuantity += 1) {
                await this.increaseQuantity();
        }

        await this.addToCart();
}
}

module.exports = { ProductPage };