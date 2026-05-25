import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import fs from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Database Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// For Vercel, we might not have a writable menu_items.json
// So we will prioritize the Database if available, otherwise return an empty array or a hardcoded subset
const JSON_DB_PATH = join(process.cwd(), 'menu_items.json');

const readJsonDb = async () => {
  try {
    const data = await fs.readFile(JSON_DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON:', err.message);
    return [];
  }
};

// API Endpoints
app.get('/api/menu', async (req, res) => {
  // Cache the response at the edge for 5 minutes to prevent massive bandwidth spikes
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
  try {
    // Try Database first on Vercel
    const { rows } = await pool.query('SELECT * FROM menu_items ORDER BY id ASC');
    if (rows.length > 0) {
      return res.json(rows);
    }
    
    // Fallback to local JSON if DB is empty
    const localData = await readJsonDb();
    res.json(localData);
  } catch (err) {
    console.error('API Error:', err.message);
    // Absolute fallback to JSON if DB fails
    const localData = await readJsonDb();
    res.json(localData);
  }
});

app.post('/api/menu', async (req, res) => {
  const { name, price, category, image, hot, description, veg } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO menu_items (name, price, category, image, hot, description, veg) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, price, category, image, hot, description, veg]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database save failed' });
  }
});

app.put('/api/menu/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, category, image, hot, description, veg } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE menu_items SET name = $1, price = $2, category = $3, image = $4, hot = $5, description = $6, veg = $7 WHERE id = $8 RETURNING *',
      [name, price, category, image, hot, description, veg, id]
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

app.delete('/api/menu/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM menu_items WHERE id = $1', [id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// Export the app for Vercel
export default app;
