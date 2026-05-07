import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(join(__dirname, 'public/uploads')));

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Database Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000 // 5 seconds timeout
});

const JSON_DB_PATH = join(__dirname, 'menu_items.json');

const readJsonDb = async () => {
  try {
    const data = await fs.readFile(JSON_DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON:', err.message);
    return [];
  }
};

const writeJsonDb = async (data) => {
  try {
    await fs.writeFile(JSON_DB_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing JSON:', err.message);
  }
};

// API Endpoints
app.get('/api/menu', async (req, res) => {
  console.log('GET /api/menu requested');
  try {
    // We'll prioritize JSON for now because the DB is having connectivity issues
    // This ensures the admin panel and website are ALWAYS fast and populated
    const localData = await readJsonDb();
    console.log(`Returning ${localData.length} items from local JSON`);
    res.json(localData);

    // Try to sync with DB in background (don't await)
    pool.query('SELECT * FROM menu_items').catch(err => {
      console.warn('Background DB check failed:', err.message);
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

app.post('/api/menu', async (req, res) => {
  const newItem = { ...req.body, id: Date.now() };
  try {
    const localData = await readJsonDb();
    localData.push(newItem);
    await writeJsonDb(localData);
    res.json(newItem);

    // Try background DB insert
    const { name, price, category, image, hot, description, veg } = req.body;
    pool.query(
      'INSERT INTO menu_items (name, price, category, image, hot, description, veg) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [name, price, category, image, hot, description, veg]
    ).catch(() => {});
  } catch (err) {
    res.status(500).json({ error: 'Save failed' });
  }
});

app.put('/api/menu/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let localData = await readJsonDb();
    const index = localData.findIndex(i => i.id == id);
    if (index !== -1) {
      localData[index] = { ...localData[index], ...req.body };
      await writeJsonDb(localData);
      res.json(localData[index]);
    } else {
      res.status(404).json({ error: 'Not found' });
    }

    // Try background DB update
    const { name, price, category, image, hot, description, veg } = req.body;
    pool.query(
      'UPDATE menu_items SET name = $1, price = $2, category = $3, image = $4, hot = $5, description = $6, veg = $7 WHERE id = $8',
      [name, price, category, image, hot, description, veg, id]
    ).catch(() => {});
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

app.delete('/api/menu/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let localData = await readJsonDb();
    localData = localData.filter(i => i.id != id);
    await writeJsonDb(localData);
    res.json({ message: 'Deleted' });

    // Try background DB delete
    pool.query('DELETE FROM menu_items WHERE id = $1', [id]).catch(() => {});
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
