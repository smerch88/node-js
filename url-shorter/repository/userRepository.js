import bcrypt from 'bcrypt';
import { knexInstance } from '../db/knexConfig.js';

const saltRounds = 10;

async function addUserToDB(name, password, created_time) {
    try {
        const createdTime = new Date(created_time).toISOString();
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await knexInstance('users').insert({ name, password: hashedPassword, created_time: createdTime });
    } catch (err) {
        console.error('Error adding user', err);
        throw err;
    }
}

async function getAllUsersFromDB() {
    try {
        const users = await knexInstance('users').select('*');
        return users;
    } catch (err) {
        console.error('Error fetching all users', err);
        throw err;
    }
}

export { addUserToDB, getAllUsersFromDB };
