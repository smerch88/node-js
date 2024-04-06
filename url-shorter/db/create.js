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

async function createTables() {
    try {
        const usersTableExists = await knexInstance.schema.hasTable('users');

        if (!usersTableExists) {
            await knexInstance.schema.createTable('users', function (table) {
                table.increments('id').primary();
                table.string('name').unique().notNullable();
                table.string('password').notNullable();
                table.timestamp('created_time').notNullable();
            });
            console.log('Users table created successfully');
        } else {
            console.log('Users table already exists');
        }

        const urlsTableExists = await knexInstance.schema.hasTable('urls');

        if (!urlsTableExists) {
            await knexInstance.schema.createTable('urls', function (table) {
                table.increments('id').primary();
                table.string('code').unique().notNullable();
                table.string('name').notNullable();
                table.text('url').notNullable();
                table.timestamp('created_at').notNullable();
                table.string('user_id').notNullable().references('name').inTable('users');
                table.integer('count').defaultTo(0);
            });
            console.log('Urls table created successfully');
        } else {
            console.log('Urls table already exists');
        }
    } catch (err) {
        console.error('Error creating tables', err);
    } finally {
        knexInstance.destroy();
    }
}

createTables();
