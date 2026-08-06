const fs = require('fs');
const data = fs.readFileSync('index.html', 'utf8');
const idx = data.indexOf('href="Index.html"');
console.log(data.substring(Math.max(0, idx - 100), idx + 200));
