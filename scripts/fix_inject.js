const fs = require('fs');
let html = fs.readFileSync('Index.html', 'utf8');

const regex = /\/\/ If local storage is empty, use injected data\s+const parsed = (\{[\s\S]*?\});\s+if \(parsed\) \{[\s\S]*?setupComplete: true\s+\};\s+\}/;

const match = html.match(regex);
if (match) {
    const payloadStr = match[1];
    const newLogic = `// If local storage is empty, use injected data
                const payload = ` + payloadStr + `;
                if (payload && payload.state) {
                    const parsedState = payload.state;
                    
                    if (payload.media && parsedState.features) {
                        for (const f of parsedState.features) {
                            if (payload.media[f.id]) {
                                saveMedia(f.id, payload.media[f.id]).catch(e => console.error(e));
                            }
                        }
                    }

                    return {
                        ...DEFAULT_STATE,
                        ...parsedState,
                        landingOverview: { ...DEFAULT_STATE.landingOverview, ...(parsedState.landingOverview || {}) },
                        landingSummary: parsedState.landingSummary || DEFAULT_STATE.landingSummary,
                        caseStudySections: parsedState.caseStudySections || DEFAULT_CASE_STUDIES,
                        features: parsedState.features || [],
                        promptSamples: parsedState.promptSamples || DEFAULT_STATE.promptSamples,
                        setupComplete: true
                    };
                }`;

    html = html.replace(regex, newLogic);
    fs.writeFileSync('Index.html', html, 'utf8');
    console.log('Update complete.');
} else {
    console.log('Regex did not match.');
}
