const fs = require('fs');
const data = fs.readFileSync('index.html', 'utf8');
const regex = /https:\/\/[^\s"'<>]+/g;
let match;
let matches = new Set();
while ((match = regex.exec(data)) !== null) {
  matches.add(match[0]);
}
console.log(Array.from(matches).join('\n'));
