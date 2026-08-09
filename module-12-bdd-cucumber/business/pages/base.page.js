class BasePage {
    constructor(page) {
        this.page = page;
    }

    async open(path = '/') {
        const baseUrl = process.env.BASE_URL || 'https://practicesoftwaretesting.com';
        const normalizedBaseUrl = baseUrl.replace(/\/$/, '');
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        const url = new URL(normalizedPath, normalizedBaseUrl).toString();

        await this.openWithRetry(url);
    }

    async openWithRetry(url, attempts = 3) {
        let lastError;

        for (let attempt = 1; attempt <= attempts; attempt += 1) {
            try {
                await this.page.goto(url, {
                    waitUntil: 'domcontentloaded',
                    timeout: 60000,
                });

                return;
            } catch (error) {
                lastError = error;

                if (attempt === attempts) {
                    throw lastError;
                }

                await this.page.waitForTimeout(3000);
            }
        }
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }
}

module.exports = { BasePage };