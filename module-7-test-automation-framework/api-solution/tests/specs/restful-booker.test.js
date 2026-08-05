const test = require('node:test');
const assert = require('node:assert/strict');

const { ApiClient } = require('../../core/api-client');
const { AuthApi } = require('../../business/api/auth.api');
const { BookingApi } = require('../../business/api/booking.api');

const {
    authData,
    bookingData,
    updateBookingData,
} = require('../../business/test-data/booking.data');

const apiClient = new ApiClient();
const authApi = new AuthApi(apiClient);
const bookingApi = new BookingApi(apiClient);

let token;
let bookingId;

function expectJsonContentType(response) {
    const contentType = response.headers.get('content-type');

    assert.ok(
        contentType && contentType.includes('application/json'),
        `Expected content-type to include application/json, but got ${contentType}`
    );
}

function expectTextContentType(response) {
    const contentType = response.headers.get('content-type');

    assert.ok(
        contentType && contentType.includes('text/plain'),
        `Expected content-type to include text/plain, but got ${contentType}`
    );
}

function expectBookingToMatch(actualBooking, expectedBooking) {
    assert.equal(actualBooking.firstname, expectedBooking.firstname);
    assert.equal(actualBooking.lastname, expectedBooking.lastname);
    assert.equal(actualBooking.totalprice, expectedBooking.totalprice);
    assert.equal(actualBooking.depositpaid, expectedBooking.depositpaid);
    assert.equal(actualBooking.bookingdates.checkin, expectedBooking.bookingdates.checkin);
    assert.equal(actualBooking.bookingdates.checkout, expectedBooking.bookingdates.checkout);
    assert.equal(actualBooking.additionalneeds, expectedBooking.additionalneeds);
}

test('Scenario: API client can create an auth token', async () => {
    const response = await authApi.createToken(authData);
    const body = await response.json();

    assert.equal(response.status, 200);
    expectJsonContentType(response);

    assert.ok(body.token, 'Expect response body to contain token');
    assert.equal(typeof body.token, 'string');

    token = body.token;
});

test('Scenario: API client can create a booking with valid booking data', async () => {
    const response = await bookingApi.createBooking(bookingData);
    const body = await response.json();

    assert.equal(response.status, 200);
    expectJsonContentType(response);

    assert.ok(body.bookingid, 'Expected response body to contain bookingid');
    assert.equal(typeof body.bookingid, 'number');
    expectBookingToMatch(body.booking, bookingData);

    bookingId = body.bookingid;
});

test('Scenario: API client can get a created booking by id', async () => {
    assert.ok(bookingId, 'Booking ID should exist before getting booking');

    const response = await bookingApi.getBookingById(bookingId);
    const body = await response.json();

    assert.equal(response.status, 200);
    expectJsonContentType(response);
    expectBookingToMatch(body, bookingData);
});

test('Scenario: API client can update an existing booking', async () => {
    assert.ok(token, 'Token should exist before updating booking');
    assert.ok(bookingId, 'Booking ID should exist before updating booking');

    const response = await bookingApi.updateBooking(bookingId, token, updateBookingData);
    const body = await response.json();

    assert.equal(response.status, 200);
    expectJsonContentType(response);
    expectBookingToMatch(body, updateBookingData);
});

test('Scenario: API client can delete an existing booking', async () => {
    assert.ok(token, 'Token should exist before deleting booking');
    assert.ok(bookingId, 'Booking ID should exist before deleting booking');

    const response = await bookingApi.deleteBooking(bookingId, token);
    const body = await response.text();

    assert.equal(response.status, 201);
    expectTextContentType(response);
    assert.equal(body, 'Created');
});
