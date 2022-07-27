require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.PG_URL,
    pool: {
      min: 2,
      max: 10,
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'migrations',
    },
    seeds: {
      directory: './seeds/dev',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.PG_URL,
    pool: {
      min: 2,
      max: 10,
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'migrations',
    },
    seeds: {
      directory: './seeds/prod',
    },
  },
};
