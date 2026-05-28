import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await pool.query('ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS cold BOOLEAN DEFAULT false;');
    console.log("Added cold column");
  } catch(e) {
    console.error(e);
  }
  process.exit(0);
}
run();
