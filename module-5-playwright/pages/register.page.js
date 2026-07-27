class RegisterPage {
    constructor(page) {
        this.page = page;

        this.firstNameInput = page.locator('[data-test="first-name"]');
        this.lastNameInput = page.locator('[data-test="last-name"]');
        this.dobInput = page.locator('[data-test="dob"]');
        this.countrySelect = page.locator('[data-test="country"]');
        this.postalCodeInput = page.locator('[data-test="postal_code"]');
        this.houseNumberInput = page.locator('[data-test="house_number"]');
        this.streetInput = page.locator('[data-test="street"]');
        this.cityInput = page.locator('[data-test="city"]');
        this.stateInput = page.locator('[data-test="state"]');
        this.phoneInput = page.locator('[data-test="phone"]');
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.registerButton = page.locator('[data-test="register-submit"]');
    }

    async open() {
        await this.page.goto('/auth/register');
    }

    async registerNewCustomer(customer) {
        await this.firstNameInput.fill(customer.firstName);
        await this.lastNameInput.fill(customer.lastName);
        await this.dobInput.fill(customer.dateOfBirth);
        await this.countrySelect.selectOption({ label: customer.country });
        await this.postalCodeInput.fill(customer.postalCode);
        await this.houseNumberInput.fill(customer.houseNumber);
        await this.streetInput.fill(customer.street);
        await this.cityInput.fill(customer.city);
        await this.stateInput.fill(customer.state);
        await this.phoneInput.fill(customer.phone);
        await this.emailInput.fill(customer.email);
        await this.passwordInput.fill(customer.password)

        await this.registerButton.click();
    }
}

module.exports = { RegisterPage };