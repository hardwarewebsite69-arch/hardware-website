const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '../public/hero-frames');
const outputDir = path.join(__dirname, '../public/hero-frames');

async function optimizeFrames() {
  if (!fs.existsSync(inputDir)) {
    console.error(`Input directory ${inputDir} does not exist.`);
    return;
  }

  const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.jpg'));

  if (files.length === 0) {
    console.log('No JPG files found to optimize.');
    return;
  }

  console.log(`Found ${files.length} JPG files. Starting optimization...`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const filenameWithoutExt = path.parse(file).name;
    const outputPath = path.join(outputDir, `${filenameWithoutExt}.webp`);

    const originalStats = fs.statSync(inputPath);
    totalOriginalSize += originalStats.size;

    await sharp(inputPath)
      .webp({ quality: 80, effort: 6 }) // quality 80, high effort compression
      .toFile(outputPath);

    const optimizedStats = fs.statSync(outputPath);
    totalOptimizedSize += optimizedStats.size;

    const savedKb = ((originalStats.size - optimizedStats.size) / 1024).toFixed(2);
    console.log(`Optimized ${file} -> ${filenameWithoutExt}.webp (Saved ${savedKb} KB)`);
    
    // Optionally delete the original JPG if we want to clean up
    // fs.unlinkSync(inputPath);
  }

  const origMb = (totalOriginalSize / (1024 * 1024)).toFixed(2);
  const optMb = (totalOptimizedSize / (1024 * 1024)).toFixed(2);
  const savings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);

  console.log('\n--- Optimization Complete ---');
  console.log(`Original total size: ${origMb} MB`);
  console.log(`Optimized total size: ${optMb} MB`);
  console.log(`Total savings: ${savings}%`);
  console.log('Remember to update the references in your code from .jpg to .webp!');
}

optimizeFrames().catch(console.error);
