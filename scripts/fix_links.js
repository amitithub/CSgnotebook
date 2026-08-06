const fs = require('fs');
let code = fs.readFileSync('deploy/index.html', 'utf8');
code = code.replace(/href="Index\.html"/g, 'href="/"');
code = code.replace(/\|\| 'Index\.html'/g, "|| '/'");
fs.writeFileSync('deploy/index.html', code);

// Same for the main file to keep it synced
let code2 = fs.readFileSync('Index.html', 'utf8');
code2 = code2.replace(/href="Index\.html"/g, 'href="/"');
code2 = code2.replace(/\|\| 'Index\.html'/g, "|| '/'");
fs.writeFileSync('Index.html', code2);
