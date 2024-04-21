import bcrypt from 'bcrypt';
import knex from 'knex';

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

export default { checkPassword };
