import bcrypt from 'bcrypt';
import { knexInstance } from '../db/knexConfig.js';

async function getUserByNameFromDB(name) {
    try {
        const user = await knexInstance('users').select('*').where({ name }).first();
        return user;
    } catch (err) {
        console.error('Error fetching user by name', err);
        throw err;
    }
}

async function checkPasswordInDB(user, password) {
    try {
        if (!user) return false;
        const match = await bcrypt.compare(password, user.password);
        return match;
    } catch (err) {
        console.error('Error checking user password', err);
        throw err;
    }
}

export { getUserByNameFromDB, checkPasswordInDB };
