module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/colorado_brews',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  }
};
