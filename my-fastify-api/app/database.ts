import Knex from "knex";

export const db = Knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: process.env.DB_URL!
    }
});

export const initDb = async () => {
    const exists = await db.schema.hasTable('todos')
    if (!exists) {
        return db.schema.createTable('todos', tb => {
            tb.increments('id').primary()
            tb.string('description').notNullable()
            tb.boolean('done').notNullable().defaultTo(false)
            tb.timestamps()
        });
    }
}

export const resetDb = async () => {
    const exists = await db.schema.hasTable('todos')
    if (exists) {
        return db.schema.dropTableIfExists('todos')
    }
}

export const seedDb = async () => {
    return db('todos').insert([
        {description: 'walk the dog'},
        {description: 'wash the dishes'},
        {description: 'watch tv'},
        {description: 'argue on the internet'},
        {description: 'pay bills'},
        {description: 'prepare dinner'}
    ])
}

