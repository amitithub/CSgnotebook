const fs = require('fs');

const mappings = {
    '≡ƒöì': '🔍',
    '≡ƒ¢í∩╕Å': '🛡️',
    'Γ£à': '✅',
    '≡ƒù║∩╕Å': '🗺️',
    '≡ƒôè': '📊',
    '≡ƒÄº': '🎧',
    '≡ƒùä∩╕Å': '🗄️',
    '≡ƒôï': '📋',
    'ΓÜí': '⚡',
    '≡ƒöº': '🔧',
    '≡ƒôô': '📓',
    '≡ƒôê': '📈',
    '≡ƒÆí': '💡',
    'Γöü': '─',
    'ΓÇó': '•',
    'ΓÜá∩╕Å': '⚠️',
    'ΓÇö': '—',
    'ΓåÉ': '←',
    'Γå╗': '↻',
    'Γå║': '↺',
    'Γåæ': '↑',
    'Γåô': '↓',
    '≡ƒô¥': '📄',
    'Γû╢': '▶',
    '≡ƒôä': '📄',
    '≡ƒ¢í∩┐Å': '🛡️',
    '≡ƒù║∩┐Å': '🗺️',
    '≡ƒùä∩┐Å': '🗄️',
    '≡ƒÄ°': '🎧',
    'ΓÜá∩┐Å': '⚠️',
    '≡ƒôè': '📊',
    'Γ£à': '✅',
    '≡ƒôï': '📋'
};

function fixFile(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    for (const [bad, good] of Object.entries(mappings)) {
        content = content.split(bad).join(good);
    }
    
    // Catch-all regex for the remaining variations
    content = content.replace(/≡ƒ¢í.*?Å/g, '🛡️');
    content = content.replace(/≡ƒù║.*?Å/g, '🗺️');
    content = content.replace(/≡ƒùä.*?Å/g, '🗄️');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed ${file}`);
}

fixFile('index.html');
fixFile('data.json');
fixFile('deploy/index.html');
fixFile('deploy/data.json');
