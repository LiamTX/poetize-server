// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: process.env.API_DB,
      user: process.env.API_USER,
      password: process.env.API_PASSWORD,
      host: process.env.API_HOST,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/db/migrations`
    }
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
