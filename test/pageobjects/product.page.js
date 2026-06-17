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
}

export default new ProductPage();