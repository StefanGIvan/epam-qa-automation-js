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
}

module.exports = { ProductPage };