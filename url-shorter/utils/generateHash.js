const availableHashChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const getRandomCharIndex = (chars) => {
    return Math.floor(Math.random() * chars.length)
}

function generateHash(quantity) {
    if (isNaN(quantity)) {
        return null;
    }

    let hash = '';
    for (let i = 0; i < quantity; i++) {
        hash += availableHashChars[getRandomCharIndex(availableHashChars)];
    }

    return hash;
}

export default generateHash;