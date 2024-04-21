import knex from "knex";

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

async function getAllUsers() {
    try {
        const users = await knexInstance('users').select('*');
        return users;
    } catch (err) {
        console.error('Error fetching all users', err);
        throw err;
    }
}

export default { addUser, getAllUsers };
