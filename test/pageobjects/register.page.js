class RegisterPage {
    get firstNameInput() {
        return $('[data-test="first-name"]');
    }

    get lastNameInput() {
        return $('[data-test="last-name"]');
    }

    get dobInput() {
        return $('[data-test="dob"]');
    }

    get countrySelect() {
        return $('[data-test="country"]');
    }

    get postalCodeInput() {
        return $('[data-test="postal_code"]');
    }

    get houseNumberInput() {
        return $('[data-test="house_number"]');
    }

    get streetInput() {
        return $('[data-test="street"]');
    }

    get cityInput() {
        return $('[data-test="city"]');
    }

    get stateInput() {
        return $('[data-test="state"]');
    }

    get phoneInput() {
        return $('[data-test="phone"]');
    }

    get emailInput() {
        return $('[data-test="email"]');
    }

    get passwordInput() {
        return $('[data-test="password"]');
    }

    get registerSubmitButton() {
        return $('[data-test="register-submit"]');
    }

    async open() {
        await browser.url('/auth/register');
    }

    async registerNewCustomer(customer) {
        await this.firstNameInput.waitForDisplayed();

        await this.firstNameInput.setValue(customer.firstName);
        await this.lastNameInput.setValue(customer.lastName);
        await this.dobInput.setValue(customer.dateOfBirth);
        await this.countrySelect.selectByVisibleText(customer.country);
        await this.postalCodeInput.setValue(customer.postalCode);
        await this. houseNumberInput.setValue(customer.houseNumber);
        await this.streetInput.setValue(customer.street);
        await this.cityInput.setValue(customer.city);
        await this.stateInput.setValue(customer.state);
        await this.phoneInput.setValue(customer.phone);
        await this.emailInput.setValue(customer.email);
        await this.passwordInput.setValue(customer.password);

        await this.registerSubmitButton.click();
    }

    async waitForRedirectToLoginPage() {
        await browser.waitUntil(
            async () => {
                const currentUrl = await browser.getUrl();
                return currentUrl.includes('/auth/login');
            },
            {
                timeout: 15000,
                timeoutMsg: 'Expected user to be redirected to the login page after registration'
            }
        );
    }
}

export default new RegisterPage();