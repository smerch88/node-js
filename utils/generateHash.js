function generateHash(quantity) {
    const availableHashChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let hash = '';

    if (isNaN(quantity)) {
        return null;
    }

    const getRandomCharIndex = (chars) => {
        return Math.floor(Math.random() * chars.length)
    }

    for (let i = 0; i < quantity; i++) {
        hash += availableHashChars[getRandomCharIndex(availableHashChars)];
    }

    return hash;
}

module.exports = generateHash;
