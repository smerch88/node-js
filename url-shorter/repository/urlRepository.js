import { knexInstance } from '../db/knexConfig.js';

async function addUrlToDB(code, name, url, user, count = 0) {
    const currentTime = new Date().toISOString();
    try {
        await knexInstance('urls').insert({ code, name, url, created_at: currentTime, user_id: user, count });
    } catch (err) {
        console.error('Error adding URL', err);
        throw err;
    }
}

async function getUrlFromDB(code) {
    try {
        const url = await knexInstance('urls').select('*').where({ code }).first();
        return url;
    } catch (err) {
        console.error('Error fetching URL', err);
        throw err;
    }
}

async function incrementUrlCountInDB(code) {
    try {
        await knexInstance('urls').where({ code }).increment('count', 1);
    } catch (err) {
        console.error('Error incrementing URL count', err);
        throw err;
    }
}

async function getUserUrlsFromDB(username) {
    try {
        const urls = await knexInstance('urls').select('code', 'name', 'url').where({ user_id: username });
        return urls;
    } catch (err) {
        console.error('Error fetching user URLs', err);
        throw err;
    }
}

export { addUrlToDB, getUrlFromDB, incrementUrlCountInDB, getUserUrlsFromDB };
