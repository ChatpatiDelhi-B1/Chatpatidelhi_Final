import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images');

async function processDirectory(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    let totalSaved = 0;
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
            totalSaved += await processDirectory(fullPath);
        } else {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
                try {
                    const stats = await fs.stat(fullPath);
                    const originalSize = stats.size;
                    
                    const buffer = await fs.readFile(fullPath);
                    let pipeline = sharp(buffer).resize({ width: 1000, withoutEnlargement: true });
                    
                    if (ext === '.png') {
                        pipeline = pipeline.png({ quality: 65, compressionLevel: 8, palette: true });
                    } else if (ext === '.jpg' || ext === '.jpeg') {
                        pipeline = pipeline.jpeg({ quality: 65, mozjpeg: true });
                    } else if (ext === '.webp') {
                        pipeline = pipeline.webp({ quality: 65 });
                    }
                    
                    await pipeline.toFile(fullPath);
                    
                    const newStats = await fs.stat(fullPath);
                    const newSize = newStats.size;
                    
                    const saved = originalSize - newSize;
                    if (saved > 0) {
                        totalSaved += saved;
                        console.log(`✅ Compressed ${entry.name} - Saved ${(saved / 1024).toFixed(2)} KB`);
                    } else {
                        console.log(`ℹ️ ${entry.name} was already highly optimized.`);
                    }
                } catch (err) {
                    console.error(`❌ Error processing ${entry.name}:`, err.message);
                }
            }
        }
    }
    return totalSaved;
}

async function main() {
    console.log(`Starting image compression in ${imagesDir}...`);
    const totalSavedBytes = await processDirectory(imagesDir);
    console.log(`\n🎉 Done! Total bandwidth saved per user load: ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB`);
}

main();
