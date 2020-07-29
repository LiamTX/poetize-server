// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'bflsvbuhtblyz11k2ive',
      user: 'uwewegezxljh38zi',
      password: 'NRlTVRA34hd87p1tUxGh',
      host: 'bflsvbuhtblyz11k2ive-mysql.services.clever-cloud.com',
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
