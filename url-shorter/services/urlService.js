import rateService from './rateService.js';
import { addUrlToDB, getUrlFromDB, incrementUrlCountInDB, getUserUrlsFromDB } from '../repository/urlRepository.js';

async function addUrl(code, name, url, user, count = 0) {
    try {
        await addUrlToDB(code, name, url, user, count);
        await rateService.setUrlRate(code);
    } catch (err) {
        console.error('Error adding URL', err);
        throw err;
    }
}

async function getUrl(code) {
    try {
        const url = await getUrlFromDB(code);
        return url;
    } catch (err) {
        console.error('Error fetching URL', err);
        throw err;
    }
}

async function incrementUrlCount(code) {
    try {
        await incrementUrlCountInDB(code);
    } catch (err) {
        console.error('Error incrementing URL count', err);
        throw err;
    }
}

async function getUserUrls(username) {
    try {
        const urls = await getUserUrlsFromDB(username);
        return urls;
    } catch (err) {
        console.error('Error fetching user URLs', err);
        throw err;
    }
}

export default { addUrl, getUrl, incrementUrlCount, getUserUrls };
