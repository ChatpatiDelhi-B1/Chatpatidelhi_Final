import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  const result = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'menu_items'");
  console.log(result.rows.map(r => r.column_name));
  process.exit(0);
}
run();
