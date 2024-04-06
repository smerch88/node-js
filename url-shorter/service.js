import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5420,
});

async function addUrl(code, name, url, user, count = 0) {
    const currentTime = new Date();
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO urls (code, name, url, created_at, user_id, count) VALUES ($1, $2, $3, $4, $5, $6)',
            [code, name, url, currentTime, user, count]
        );
        client.release();
        return result.rows[0];
    } catch (err) {
        console.error('Error executing SQL query', err);
        throw err;
    }
}

async function getUserUrls(username) {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'SELECT code, name, url FROM urls WHERE user_id = $1',
            [username]
        );
        client.release();
        return result.rows;
    } catch (err) {
        console.error('Error executing SQL query', err);
        throw err;
    }
}

async function addUser(name, password, created_time) {
    try {
        const createdTime = new Date(created_time).toISOString();

        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO users (name, password, created_time) VALUES ($1, $2, $3)',
            [name, password, createdTime]
        );
        client.release();
        return result.rows[0];
    } catch (err) {
        console.error('Error executing SQL query', err);
        throw err;
    }
}


async function getUrl(code) {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'SELECT * FROM urls WHERE code = $1',
            [code]
        );
        client.release();
        return result.rows[0];
    } catch (err) {
        console.error('Error executing SQL query', err);
        throw err;
    }
}

async function getAllUsers() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users');
        client.release();
        return result.rows;
    } catch (err) {
        console.error('Error executing SQL query', err);
        throw err;
    }
}

async function incrementUrlCount(code) {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'UPDATE urls SET count = count + 1 WHERE code = $1',
            [code]
        );
        client.release();
        return result.rows[0];
    } catch (err) {
        console.error('Error executing SQL query', err);
        throw err;
    }
}

async function checkPassword(name, password) {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'SELECT * FROM users WHERE name = $1 AND password = $2',
            [name, password]
        );
        client.release();
        return result.rows.length > 0;
    } catch (err) {
        console.error('Error executing SQL query', err);
        throw err;
    }
}

export default { addUrl, getUrl, incrementUrlCount, addUser, getAllUsers, checkPassword, getUserUrls };
