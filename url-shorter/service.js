const storage = new Map();

function add(code, name, url, user) {
    const currentTime = new Date();
    storage.set(code, { name, url, createdAt: currentTime, user });
}

function get(code) {
    return storage.get(code);
}

export default { add, get };
