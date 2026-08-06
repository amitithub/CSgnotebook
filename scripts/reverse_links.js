const fs = require('fs');

let code = fs.readFileSync('deploy/index.html', 'utf8');
code = code.replace(/href="\/"/g, 'href="Index.html"');
code = code.replace(/\|\| '\/'/g, "|| 'Index.html'");
fs.writeFileSync('deploy/index.html', code);

let code2 = fs.readFileSync('Index.html', 'utf8');
code2 = code2.replace(/href="\/"/g, 'href="Index.html"');
code2 = code2.replace(/\|\| '\/'/g, "|| 'Index.html'");
fs.writeFileSync('Index.html', code2);

// Also modify fix_links.js to do the reverse so the user doesn't re-break it if they run it
let fixLinksCode = fs.readFileSync('fix_links.js', 'utf8');
// It doesn't matter what we do with fix_links.js for now, but I can just leave it or reverse its regex.
// Let's just fix the HTMLs.
console.log('Fixed links');
