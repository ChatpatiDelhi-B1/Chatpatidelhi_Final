import fs from 'fs';
import pg from 'pg';
import { menuItems } from './src/data/menuData.js';

const { Pool } = pg;

async function updateMenuData() {
  const pool = new Pool({ 
    connectionString: 'postgresql://neondb_owner:npg_7zAn6eNrlyPm@ep-proud-star-anfclaz7-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require', 
    ssl: { rejectUnauthorized: false } 
  });
  
  const res = await pool.query('SELECT id, description FROM menu_items');
  const dbDescriptions = {};
  res.rows.forEach(row => {
    dbDescriptions[row.id] = row.description;
  });
  pool.end();
  
  menuItems.forEach(category => {
    if (category.items) {
      category.items.forEach(item => {
        if (dbDescriptions[item.id]) {
          item.description = dbDescriptions[item.id];
        }
      });
    }
  });
  
  const output = `export const menuItems = ${JSON.stringify(menuItems, null, 4)};\n`;
  fs.writeFileSync('./src/data/menuData.js', output, 'utf8');
  console.log('Successfully updated src/data/menuData.js');
}

updateMenuData();
