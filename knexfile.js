module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/colorado_brews',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
