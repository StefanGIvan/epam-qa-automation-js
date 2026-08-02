// API object responsible for booking endpoints

class BookingApi {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async createBooking(bookingData) {
        return this.apiClient.request('/booking', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });
    }

    async getBookingById(bookingId) {
        return this.apiClient.request(`/booking/${bookingId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
    }

    async updateBooking(bookingId, token, bookingData) {
        return this.apiClient.request(`/booking/${bookingId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Cookie: `token=${token}`,
            },
            body: JSON.stringify(bookingData),
        });
    }

    async deleteBooking(bookingId, token) {
        return this.apiClient.request(`/booking/${bookingId}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Cookie: `token=${token}`,
            },
        });
    }
}

module.exports = { BookingApi };