const test = require('node:test');
const assert = require('node:assert/strict');

const {
    createToken,
    createBooking,
    getBooking,
    updateBooking,
    deleteBooking,
} = require('../helpers/api-client');

const {
    assertStatus,
    assertHeaderContains,
    assertBookingBody,
} = require('../helpers/assertions');

const {
    authData,
    bookingData,
    updatedBookingData,
} = require('../test-data/booking.data');

let token;
let bookingId;

test('Scenario: create a token and reuse it for authenticated requests', async () => {
    const response = await createToken(authData);
    const body = await response.json();

    assertStatus(response, 200);
    assertHeaderContains(response, 'content-type', 'application/json');

    assert.ok(body.token, 'Expected response body to contain token');
    assert.equal(typeof body.token, 'string');

    token = body.token;
});

test('Scenario: create a booking with valid customer data', async() => {
    const response = await createBooking(bookingData);
    const body = await response.json();

    assertStatus(response, 200);
    assertHeaderContains(response, 'content-type', 'application/json');

    assert.ok(body.bookingid, 'Expected response body to contain bookingId');
    assert.equal(typeof body.bookingid, 'number');
    assertBookingBody(body.booking, bookingData);

    bookingId = body.bookingid;
});

test('Scenario: get created booking by id', async () => {
    assert.ok(bookingId, 'Booking ID should exist before getting booking');

    const response = await getBooking(bookingId);
    const body = await response.json();

    assertStatus(response, 200);
    assertHeaderContains(response, 'content-type', 'application/json');
    assertBookingBody(body, bookingData);
});

test('Scenario: update an existing booking', async () => {
    assert.ok(token, 'Token should exist before updating booking');
    assert.ok(bookingId, 'Booking ID should exist before updating booking');

    const response = await updateBooking(bookingId, token, updatedBookingData);
    const body = await response.json();

    assertStatus(response, 200);
    assertHeaderContains(response, 'content-type', 'application/json');
    assertBookingBody(body, updatedBookingData);
});

test('Scenario: delete an existing booking', async () => {
    assert.ok(token, 'Token should exist before deleting booking');
    assert.ok(bookingId, 'Booking ID should exist before deleting booking');

    const response = await deleteBooking(bookingId, token);
    const body = await response.text();

    assertStatus(response, 201);
    assertHeaderContains(response, 'content-type', 'text/plain');
    assert.equal(body, 'Created');
});