import pkg from 'pg';
import dotenv from 'dotenv';
import { menuItems } from './src/data/menuData.js';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const createTableAndSeed = async () => {
  try {
    console.log('Creating table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price VARCHAR(50) NOT NULL,
        category VARCHAR(100) NOT NULL,
        image TEXT,
        hot BOOLEAN DEFAULT false,
        cold BOOLEAN DEFAULT false,
        description TEXT,
        veg BOOLEAN,
        variants JSONB
      );
    `);
    
    console.log('Table created or already exists. Clearing existing data for fresh seed...');
    await pool.query('TRUNCATE TABLE menu_items RESTART IDENTITY CASCADE');

    console.log('Seeding data from local menuData.js...');
    for (const item of menuItems) {
      await pool.query(
        `INSERT INTO menu_items (name, price, category, image, hot, cold, description, veg, variants)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [item.name, item.price, item.category, item.image, item.hot || false, item.cold || false, item.description || '', item.veg !== undefined ? item.veg : null, item.variants ? JSON.stringify(item.variants) : null]
      );
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

createTableAndSeed();
