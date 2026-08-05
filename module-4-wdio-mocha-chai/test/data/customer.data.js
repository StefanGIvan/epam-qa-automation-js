export function createCustomer() {
    const timestamp = Date.now();

    return {
        firstName: 'Test',
        lastName: 'User',
        dateOfBirth: '1995-05-20',
        country: 'Romania',
        postalCode: '010101',
        houseNumber: '12',
        street: 'Test Street',
        city: 'Bucharest',
        state: 'Bucharest',
        phone: '0712345678',
        email: `testuser${timestamp}@mail.com`,
        password: `StrongTest${timestamp}!Aa`,
    };
}
