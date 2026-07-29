// API object responsible for booking endpoints

class BookingApi {
    constructor() {
        this.baseUrl = 'https://restful-booker.herokuapp.com';
    }

    async createBooking(bookingData) {
        return fetch(`${this.baseUrl}/booking`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });
    }

    async getBookingById(bookingId) {
        return fetch(`${this.baseUrl}/booking/${bookingId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
    }

    async updateBooking(bookingId, token, bookingData) {
        return fetch(`${this.baseUrl}/booking/${bookingId}`, {
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
        return fetch(`${this.baseUrl}/booking/${bookingId}`, {
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