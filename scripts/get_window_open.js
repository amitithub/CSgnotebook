const fs = require('fs');
const data = fs.readFileSync('index.html', 'utf8');
const regex = /window\.open\((["'])(.*?)\1/g;
let match;
while ((match = regex.exec(data)) !== null) {
  console.log(match[2]);
}
