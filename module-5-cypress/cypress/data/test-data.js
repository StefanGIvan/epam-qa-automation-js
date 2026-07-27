const products = {
  combinationPliers: {
    name: 'Combination Pliers',
    price: '$14.15',
    description: 'Versatile combination pliers',
  },
}

const cart = {
  quantity: '2',
}

const sorting = {
  priceLowToHigh: 'price,asc',
}

function createRegistrationUser() {
  const timestamp = Date.now()

  return {
    firstName: 'Stefan',
    lastName: 'Test',
    dateOfBirth: '1997-02-20',
    country: 'Romania',
    postalCode: '010101',
    houseNumber: '42',
    street: 'Test Street',
    city: 'Bucharest',
    state: 'Bucharest',
    phone: '0712345678',
    email: `stefan.${timestamp}@example.com`,
    password: `SafePass-${timestamp}!Aa1`,
  }
}

module.exports = {
  products,
  cart,
  sorting,
  createRegistrationUser,
}