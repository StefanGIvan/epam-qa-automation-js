const bookingData = {
    firstname: 'Stefan',
    lastname: 'Ivan',
    totalprice: 250,
    depositpaid: true,
    bookingdates: {
        checkin: '2026-08-01',
        checkout: '2026-08-07',
    },
    additionalneeds: 'Breakfast',
};

const updatedBookingData = {
    firstname: 'StefanUpdated',
    lastname: 'IvanUpdated',
    totalprice: 350,
    depositpaid: false,
    bookingdates: {
        checkin: '2026-09-01',
        checkout: '2026-09-10',
    },
    additionalneeds: 'Dinner',
};

const authData = {
    username: 'admin',
    password: 'password123',
};

module.exports = {
    bookingData,
    updatedBookingData,
    authData,
};