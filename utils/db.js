// const mysql = require('mysql2/promise');
const { createPool } = require('mysql2/promise');

const pool = createPool({
  host: 'localhost',
  user: 'root',
  database: 'santa_gifts',
  namedPlaceholders: true,
  decimalNumbers: true,
});

module.exports = {
  pool,
};
