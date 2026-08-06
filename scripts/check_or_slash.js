const fs = require('fs');
const data = fs.readFileSync('index.html', 'utf8');
const regex = /\|\|\s*['"]\/['"]/g;
console.log(data.match(regex));
