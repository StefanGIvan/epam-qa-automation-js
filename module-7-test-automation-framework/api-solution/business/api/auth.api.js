// API object responsible for authentication

class AuthApi {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async createToken(authData) {
        return this.apiClient.request('/auth', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(authData),
        });
    }
}

module.exports = { AuthApi };
