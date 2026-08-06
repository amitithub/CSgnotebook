const fs = require('fs');
let html = fs.readFileSync('Index.html', 'utf8');

const targetRegex = /if \(s\) \{\s+const parsed = JSON\.parse\(s\);\s+\/\/ Merge with defaults to handle new fields\s+return \{[\s\S]*?setupComplete: parsed\.setupComplete \|\| false\s+\};\s+\}/;

const newLogic = `if (s) {
                    const parsed = JSON.parse(s);
                    // Only use local storage if it's already setup or has features
                    if (parsed.setupComplete || (parsed.features && parsed.features.length > 0)) {
                        return {
                            ...DEFAULT_STATE,
                            ...parsed,
                            landingOverview: { ...DEFAULT_STATE.landingOverview, ...(parsed.landingOverview || {}) },
                            landingSummary: parsed.landingSummary || DEFAULT_STATE.landingSummary,
                            caseStudySections: parsed.caseStudySections || DEFAULT_CASE_STUDIES,
                            features: parsed.features || [],
                            promptSamples: parsed.promptSamples || DEFAULT_STATE.promptSamples,
                            setupComplete: parsed.setupComplete || false
                        };
                    }
                }`;

if (targetRegex.test(html)) {
    html = html.replace(targetRegex, newLogic);
    fs.writeFileSync('Index.html', html, 'utf8');
    console.log('Update complete.');
} else {
    console.log('Target not found.');
}
