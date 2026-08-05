const BASE_URL = 'https://restful-booker.herokuapp.com';

class ApiClient {
    async request(path, options = {}) {
        return fetch(`${BASE_URL}${path}`, options);
    }
}

module.exports = { ApiClient };
