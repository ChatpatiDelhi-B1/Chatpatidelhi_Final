import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, 'public', 'images');

function getAllImages(dir) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(getAllImages(fullPath));
        } else {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
                results.push(fullPath);
            }
        }
    }
    return results;
}

async function compressImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const originalSize = fs.statSync(filePath).size;
    const tempPath = filePath + '.tmp';

    try {
        const img = sharp(filePath);
        const meta = await img.metadata();
        const maxWidth = 1200;
        const newWidth = meta.width > maxWidth ? maxWidth : undefined;

        if (ext === '.png') {
            await img
                .resize(newWidth)
                .png({ quality: 80, compressionLevel: 9 })
                .toFile(tempPath);
        } else if (ext === '.jpg' || ext === '.jpeg') {
            await img
                .resize(newWidth)
                .jpeg({ quality: 80, progressive: true })
                .toFile(tempPath);
        } else if (ext === '.webp') {
            await img
                .resize(newWidth)
                .webp({ quality: 80 })
                .toFile(tempPath);
        }

        const newSize = fs.statSync(tempPath).size;

        if (newSize < originalSize) {
            fs.renameSync(tempPath, filePath);
            const savedMB = ((originalSize - newSize) / 1024 / 1024).toFixed(2);
            const pct = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
            console.log(`✅ ${path.basename(filePath)}: ${(originalSize/1024/1024).toFixed(2)}MB → ${(newSize/1024/1024).toFixed(2)}MB  (-${pct}%)`);
        } else {
            fs.unlinkSync(tempPath);
            console.log(`⏭️  ${path.basename(filePath)}: already optimal`);
        }
    } catch (err) {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        console.error(`❌ ${path.basename(filePath)}: ${err.message}`);
    }
}

async function main() {
    const images = getAllImages(imagesDir);
    console.log(`\n🔍 Found ${images.length} images — starting compression...\n`);

    const before = images.reduce((sum, f) => sum + fs.statSync(f).size, 0);

    for (const img of images) {
        await compressImage(img);
    }

    const allAfter = getAllImages(imagesDir);
    const after = allAfter.reduce((sum, f) => sum + fs.statSync(f).size, 0);
    const savedMB = ((before - after) / 1024 / 1024).toFixed(2);
    const pct = (((before - after) / before) * 100).toFixed(1);

    console.log(`\n🎉 Compression Complete!`);
    console.log(`   Before : ${(before / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   After  : ${(after  / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Saved  : ${savedMB} MB  (${pct}% smaller)`);
}

main();
