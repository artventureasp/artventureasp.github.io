import fs from 'fs';

let content = fs.readFileSync('./dist/index.html').toString('utf-8');
content = content.replace(/\/assets/g, '/ArtVenture-ASP/assets');
fs.writeFileSync('./dist/index.html', content);