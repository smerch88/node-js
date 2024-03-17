const urlStorage = new Map();
const userStorage = new Map();

function addUrl(code, name, url, user, count = 0) {
    const currentTime = new Date();
    urlStorage.set(code, { name, url, createdAt: currentTime, user, count });
}

function addUser(name, password, created_time) {
    const newUser = { name, password, created_time };
    userStorage.set(name, newUser);
}

function getUrl(code) {
    return urlStorage.get(code);
}

function getAllUsers() {
    return userStorage;
}

function incrementUrlCount(code) {
    const data = urlStorage.get(code);
    if (data) {
        data.count++;
        urlStorage.set(code, data);
    }
}

export default { addUrl, getUrl, incrementUrlCount, addUser, getAllUsers };
