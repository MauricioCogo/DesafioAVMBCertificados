const pg = require('pg');

module.exports = {
  development: {
    dialect: 'postgres',
    dialectModule: pg,
    host: '127.0.0.1',
    username: 'postgres',
    password: '123',
    database: 'avmb',
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true
    }
  }
};