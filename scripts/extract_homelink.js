const fs = require('fs');
const data = fs.readFileSync('index.html', 'utf8');
const start = data.indexOf('<a id="home-link"');
const end = data.indexOf('</a>', start);
console.log(data.substring(start, end + 4));
