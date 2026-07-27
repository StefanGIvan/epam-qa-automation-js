const assert = require('node:assert/strict');

function assertStatus(response, expectedStatus) {
    assert.equal(response.status, expectedStatus);
}

function assertHeaderContains(response, headerName, expectedValue) {
    const actualHeader = response.headers.get(headerName);

    assert.ok(
        actualHeader && actualHeader.includes(expectedValue),
        `Expected ${headerName} to include ${expectedValue}, but got ${actualHeader}`
    );
}

function assertBookingBody(actualBooking, expectedBooking) {
    assert.equal(actualBooking.firstname, expectedBooking.firstname);
    assert.equal(actualBooking.lastname, expectedBooking.lastname);
    assert.equal(actualBooking.totalprice, expectedBooking.totalprice);
    assert.equal(actualBooking.depositpaid, expectedBooking.depositpaid);
    assert.equal(actualBooking.bookingdates.checkin, expectedBooking.bookingdates.checkin);
    assert.equal(actualBooking.bookingdates.checkout, expectedBooking.bookingdates.checkout);
    assert.equal(actualBooking.additionalneeds, expectedBooking.additionalneeds);
}

module.exports = {
    assertStatus,
    assertHeaderContains,
    assertBookingBody,
};