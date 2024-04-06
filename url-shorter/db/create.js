import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5420,
});

async function createTables() {
    const client = await pool.connect();
    try {
        await client.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, created_time TIMESTAMP NOT NULL)');
        await client.query('CREATE TABLE IF NOT EXISTS urls (id SERIAL PRIMARY KEY, code VARCHAR(255) UNIQUE NOT NULL, name VARCHAR(255) NOT NULL, url TEXT NOT NULL, created_at TIMESTAMP NOT NULL, user_id VARCHAR(255) NOT NULL REFERENCES users(name), count INT DEFAULT 0)');
        console.log('Tables created successfully');
    } catch (err) {
        console.error('Error creating tables', err);
    } finally {
        client.release();
    }
}

createTables();
