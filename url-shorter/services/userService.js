import * as userRepository from '../repository/userRepository.js';

async function addUser(name, password, created_time) {
    try {
        await userRepository.addUserToDB(name, password, created_time);
    } catch (err) {
        console.error('Error adding user', err);
        throw err;
    }
}

async function getAllUsers() {
    try {
        const users = await userRepository.getAllUsersFromDB();
        return users;
    } catch (err) {
        console.error('Error fetching all users', err);
        throw err;
    }
}

export default { addUser, getAllUsers };
