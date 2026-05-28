import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  const result = await pool.query('SELECT id, name, image FROM menu_items');
  console.log(JSON.stringify(result.rows, null, 2));
  process.exit(0);
}
run();
