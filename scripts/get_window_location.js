const fs = require('fs');
const data = fs.readFileSync('index.html', 'utf8');
const regex = /window\.location(\.href)?\s*=\s*(["'])(.*?)\2/g;
let match;
while ((match = regex.exec(data)) !== null) {
  console.log(match[3]);
}
