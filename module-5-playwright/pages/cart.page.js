class CartPage {
    constructor(page) {
        this.page = page;
        this.cartLink = page.locator('[data-test="nav-cart"]');
    }

    async open() {
        await this.cartLink.click();
    }

    productRow(productName) {
        return this.page.getByRole('row', { name: new RegExp(productName) });
    }

    productByName(productName) {
        return this.productRow(productName).getByText(productName, { exact: true });
    }

    quantityInput(productName) {
        return this.productRow(productName).getByRole('spinbutton', {
            name: new RegExp(`Quantity for ${productName}`),
        });
    }

    async setQuantity(productName, quantity) {
        await this.quantityInput(productName).fill(String(quantity));
        await this.quantityInput(productName).press('Enter');
    }

    lineTotalForProduct(productName) {
        return this.productRow(productName).locator('td').nth(3);
    }
}

module.exports = { CartPage };