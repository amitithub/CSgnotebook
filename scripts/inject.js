const fs = require('fs');
const dataContent = fs.readFileSync('data.json', 'utf8');
let html = fs.readFileSync('Index.html', 'utf8');

// Replace everything between "// If local storage is empty, try to fetch data.json publicly" and "            } catch(e)"
const regex = /\/\/ If local storage is empty, try to fetch data\.json publicly[\s\S]*?(?=            \} catch\(e\))/;

const newLogic = `// If local storage is empty, use injected data
                const parsed = ` + dataContent + `;
                if (parsed) {
                    return {
                        ...DEFAULT_STATE,
                        ...parsed,
                        landingOverview: { ...DEFAULT_STATE.landingOverview, ...(parsed.landingOverview || {}) },
                        landingSummary: parsed.landingSummary || DEFAULT_STATE.landingSummary,
                        caseStudySections: parsed.caseStudySections || DEFAULT_CASE_STUDIES,
                        features: parsed.features || [],
                        promptSamples: parsed.promptSamples || DEFAULT_STATE.promptSamples,
                        setupComplete: true
                    };
                }
`;

if (regex.test(html)) {
    html = html.replace(regex, newLogic);
    fs.writeFileSync('Index.html', html, 'utf8');
    console.log('Injection complete.');
} else {
    console.log('Regex did not match.');
}
