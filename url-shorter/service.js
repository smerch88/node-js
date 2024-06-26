import bcrypt from 'bcrypt';
import knex from 'knex';
import rateService from './services/rateService.js';

const knexInstance = knex({
    client: 'pg',
    connection: {
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'postgres',
        port: 5420
    }
});

const saltRounds = 10;

async function addUrl(code, name, url, user, count = 0) {
    const currentTime = new Date().toISOString();
    try {
        await knexInstance('urls').insert({ code, name, url, created_at: currentTime, user_id: user, count });
        await rateService.setUrlRate(code);
    } catch (err) {
        console.error('Error adding URL', err);
        throw err;
    }
}

async function getUserUrls(username) {
    try {
        const urls = await knexInstance('urls').select('code', 'name', 'url').where({ user_id: username });
        return urls;
    } catch (err) {
        console.error('Error fetching user URLs', err);
        throw err;
    }
}

async function addUser(name, password, created_time) {
    try {
        const createdTime = new Date(created_time).toISOString();
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await knexInstance('users').insert({ name, password: hashedPassword, created_time: createdTime });
    } catch (err) {
        console.error('Error adding user', err);
        throw err;
    }
}

async function getUrl(code) {
    try {
        const url = await knexInstance('urls').select('*').where({ code }).first();
        return url;
    } catch (err) {
        console.error('Error fetching URL', err);
        throw err;
    }
}

async function getAllUsers() {
    try {
        const users = await knexInstance('users').select('*');
        return users;
    } catch (err) {
        console.error('Error fetching all users', err);
        throw err;
    }
}

async function incrementUrlCount(code) {
    try {
        await knexInstance('urls').where({ code }).increment('count', 1);
    } catch (err) {
        console.error('Error incrementing URL count', err);
        throw err;
    }
}

async function checkPassword(name, password) {
    try {
        const user = await knexInstance('users').select('*').where({ name }).first();
        if (!user) return false;
        const match = await bcrypt.compare(password, user.password);
        return match;
    } catch (err) {
        console.error('Error checking user password', err);
        throw err;
    }
}

export default { addUrl, getUrl, incrementUrlCount, addUser, getAllUsers, checkPassword, getUserUrls };
