class BasePage {
    constructor(page) {
        this.page = page;
    }

    async open(path = '/') {
        await this.page.goto(path);
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }
}

module.exports = { BasePage };