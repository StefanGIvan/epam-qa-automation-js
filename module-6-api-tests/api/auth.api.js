// API object responsible for authentication

class AuthApi {
    constructor() {
        this.baseUrl = 'https://restful-booker.herokuapp.com';
    }

    async createToken(authData) {
        return fetch(`${this.baseUrl}/auth`, {
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