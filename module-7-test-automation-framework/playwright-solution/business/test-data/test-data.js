const { getRandomEmail } = require('../../core/randomize.utils');

const products = {
    combinationPliers: {
        name: 'Combination Pliers',
        price: '$14.15',
        description:
            'Versatile combination pliers designed for gripping, bending, and cutting wire with ease.',
    },

    boltCutters: {
        name: 'Bolt Cutters',
        cartQuantity: 2,
        expectedQuantity: '2',
        expectedLinePrice: '$96.82',
    },
};

const filters = {
    handTools: {
        categoryName: 'Hand Tools',
        sortValue: 'price,asc',
    },
};

function createCustomer() {
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
        email: getRandomEmail(),
        password: `StrongPass-${timestamp}!Aa`,
    };
}

module.exports = {
    products,
    filters,
    createCustomer,
};