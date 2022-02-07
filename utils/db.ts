import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: 'localhost',
  user: 'root',
  database: 'santa_gifts',
  namedPlaceholders: true,
  decimalNumbers: true,
});
