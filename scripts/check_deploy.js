const https = require('https');

function checkUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`${url}`);
                console.log(`  Status: ${res.statusCode}`);
                console.log(`  Size: ${data.length}`);
                console.log(`  Has injected data: ${data.includes('If local storage is empty, use injected data')}`);
                console.log(`  First 200 chars: ${data.substring(0, 200)}`);
                console.log('');
                resolve();
            });
        }).on('error', (e) => {
            console.log(`${url} ERROR: ${e.message}`);
            resolve();
        });
    });
}

(async () => {
    await checkUrl('https://gnotebook.namit-work88.workers.dev/');
    await checkUrl('https://gnotebook.namit-work88.workers.dev/Index.html');
    await checkUrl('https://gnotebook.namit-work88.workers.dev/index.html');
})();
