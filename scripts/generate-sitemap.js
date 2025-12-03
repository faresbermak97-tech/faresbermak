import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = 'https://faresbermak.com'; // Replace with your actual domain
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');
const PAGES = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/#work', priority: '0.8', changefreq: 'monthly' },
  { url: '/#about', priority: '0.8', changefreq: 'monthly' },
  { url: '/#contact', priority: '0.9', changefreq: 'monthly' },
];

// Function to format date as YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Generate sitemap XML
function generateSitemap() {
  const today = new Date();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  PAGES.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${formatDate(today)}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

// Write sitemap to file
function writeSitemap() {
  try {
    const sitemap = generateSitemap();
    fs.writeFileSync(OUTPUT_PATH, sitemap);
    console.log(`✅ Sitemap generated successfully at ${OUTPUT_PATH}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
}

// Run the script
writeSitemap();
