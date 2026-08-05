function getRandomEmail(prefix= 'test-user') {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}@example.com`;
}

module.exports = { getRandomEmail };