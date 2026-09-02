import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function fetchUrl(targetUrl) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(targetUrl);
    const client = parsed.protocol === 'https:' ? https : http;
    const req = client.get(targetUrl, { headers: { 'User-Agent': userAgent, 'Accept': 'text/html,application/xhtml+xml,application/xml' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const nextUrl = new URL(res.headers.location, targetUrl).href;
        return fetchUrl(nextUrl).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
  });
}

function downloadImage(imgUrl, destPath) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(imgUrl);
    const client = parsed.protocol === 'https:' ? https : http;
    const req = client.get(imgUrl, { headers: { 'User-Agent': userAgent } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const nextUrl = new URL(res.headers.location, imgUrl).href;
        return downloadImage(nextUrl, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(destPath);
      });
    });
    req.on('error', reject);
  });
}

async function run() {
  console.log('Fetching Zameen Al Rehman Garden Phase 2 HTML listings...');
  const plotHtml = await fetchUrl('https://www.zameen.com/Plots/Lahore_Al_Rehman_Garden_Phase_2-3694-1.html');
  const houseHtml = await fetchUrl('https://www.zameen.com/Houses/Lahore_Al_Rehman_Garden_Phase_2-3694-1.html');

  const combined = plotHtml + houseHtml;
  // Match image URLs in Zameen format e.g. https://images.zameen.com/... or https://media.zameen.com/...
  const regex = /https:\/\/[^"'\s<>()\\]+?(?:zameen\.com|olx\.com\.pk)[^"'\s<>()\\]+?\.(?:jpg|jpeg|webp|png)(?:\?[^"'\s<>()\\]*)?/gi;
  const matches = [...new Set(combined.match(regex) || [])];

  console.log(`Found ${matches.length} property image URLs on Zameen!`);
  
  const destDir = path.resolve('public/images/properties/processed');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const downloaded = [];
  for (let i = 0; i < Math.min(matches.length, 30); i++) {
    const imgUrl = matches[i];
    const filename = `zameen-arg-p2-${i + 1}.webp`;
    const dest = path.join(destDir, filename);
    try {
      await downloadImage(imgUrl, dest);
      console.log(`Downloaded (${i + 1}/${matches.length}): ${imgUrl} -> ${filename}`);
      downloaded.push(`/images/properties/processed/${filename}`);
    } catch (err) {
      console.warn(`Failed to download ${imgUrl}:`, err.message);
    }
  }

  console.log(`Successfully saved ${downloaded.length} original Zameen images to ${destDir}`);
}

run().catch(console.error);
