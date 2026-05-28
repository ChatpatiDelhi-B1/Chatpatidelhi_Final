import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function testDelete() {
  try {
    const { rows } = await pool.query('SELECT * FROM menu_items WHERE id = 134');
    console.log('Item exists?', rows.length > 0);
    
    console.log('Attempting DELETE...');
    await pool.query('DELETE FROM menu_items WHERE id = $1', ['134']);
    console.log('DELETE query executed successfully.');
    
    process.exit(0);
  } catch (err) {
    console.error('DELETE error:', err.message);
    process.exit(1);
  }
}

testDelete();
