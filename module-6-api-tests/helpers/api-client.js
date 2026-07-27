const BASE_URL = 'https://restful-booker.herokuapp.com';

const jsonHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

function createToken(authData) {
    return fetch(`${BASE_URL}/auth`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(authData),
    });
}


// Send POST request to /booking
// Tell the API we send JSON
// Convert the JavaScript object into JSON text
// Return the raw response to the test
function createBooking(bookingData) {
    return fetch(`${BASE_URL}/booking`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(bookingData),
    });
}

function getBooking(bookingId) {
    return fetch(`${BASE_URL}/booking/${bookingId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });
}

function updateBooking(bookingId, token, bookingData) {
    return fetch(`${BASE_URL}/booking/${bookingId}`, {
        method: 'PUT',
        headers: {
            ...jsonHeaders,
            Cookie: `token=${token}`
        },
        body: JSON.stringify(bookingData),
    });
}

function deleteBooking(bookingId, token) {
    return fetch(`${BASE_URL}/booking/${bookingId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Cookie: `token=${token}`,
        },
    });
}

module.exports = {
    createToken,
    createBooking,
    getBooking,
    updateBooking,
    deleteBooking,
};