class BasePage {
    constructor(page) {
        this.page = page;
    }

    async open(path = '/') {
        const baseUrl = process.env.BASE_URL || 'https://practicesoftwaretesting.com';
        const url = new URL(path, baseUrl).toString();

        await this.page.goto(url, {
            waitUntil: 'domcontentloaded',
        });
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }
}

module.exports = { BasePage };
