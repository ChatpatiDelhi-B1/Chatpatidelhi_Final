import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import multer from 'multer';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import sharp from 'sharp';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure uploads directory exists
const UPLOADS_DIR = join(__dirname, 'public/uploads');
try {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  console.log('Uploads directory ready:', UPLOADS_DIR);
} catch (err) {
  console.error('Error creating uploads directory:', err.message);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Compress all HTTP responses
app.use(compression());

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());

// Cache static files for 30 days
app.use('/uploads', express.static(join(__dirname, 'public/uploads'), {
  maxAge: '30d' // 30 days cache for images
}));

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ 
  storage: storage,
  limits: { 
    fileSize: 50 * 1024 * 1024, // 50MB for actual file uploads
    fieldSize: 50 * 1024 * 1024  // 50MB for text fields (crucial for Base64 strings)
  }
});

// Database Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
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
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400');
  console.log('GET /api/menu requested');
  try {
    const result = await pool.query('SELECT * FROM menu_items ORDER BY id ASC');
    console.log(`Returning ${result.rows.length} items from Postgres Database`);
    res.json(result.rows);
  } catch (err) {
    console.error('Database Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});




app.post('/api/upload', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const originalPath = req.file.path;
    const optimizedFilename = 'opt-' + req.file.filename + '.webp';
    const optimizedPath = join(__dirname, 'public/uploads', optimizedFilename);
    
    // Optimize the image
    await sharp(originalPath)
      .resize(800, null, { withoutEnlargement: true }) // Resize width to max 800px
      .webp({ quality: 80 }) // Convert to WebP format
      .toFile(optimizedPath);
      
    // Delete the original uploaded file to save server space
    await fs.unlink(originalPath);
    
    res.json({ imageUrl: `/uploads/${optimizedFilename}` });
  } catch (error) {
    console.error('Image processing error:', error);
    res.status(500).json({ error: 'Error processing image' });
  }
});

app.post('/api/menu', async (req, res) => {
  const { name, price, category, image, hot, cold, description, veg, variants } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO menu_items (name, price, category, image, hot, cold, description, veg, variants) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        name, price, category, image,
        hot === 'true' || hot === true,
        cold === 'true' || cold === true,
        description || '',
        veg === 'true' || veg === true || veg === undefined,
        variants ? JSON.stringify(variants) : null
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Insert error:', err.message);
    res.status(500).json({ error: 'Save failed: ' + err.message });
  }
});

app.put('/api/menu/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, category, image, hot, cold, description, veg, variants } = req.body;
  try {
    const result = await pool.query(
      'UPDATE menu_items SET name=$1, price=$2, category=$3, image=$4, hot=$5, cold=$6, description=$7, veg=$8, variants=$9 WHERE id=$10 RETURNING *',
      [
        name, price, category, image,
        hot === 'true' || hot === true,
        cold === 'true' || cold === true,
        description || '',
        veg === 'true' || veg === true || veg === undefined,
        variants ? JSON.stringify(variants) : null,
        id
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).json({ error: 'Update failed: ' + err.message });
  }
});

app.delete('/api/menu/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM menu_items WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ error: 'Delete failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
