import fs from 'fs';

let code = fs.readFileSync('src/pages/ModelDetails.tsx', 'utf-8');

const lines = code.split('\n');
let tags = [];
for (let i = 285; i <= 405; i++) {
    const line = lines[i];
    let found = false;
    // VERY simple parser
    const matches = line.match(/<\/?(?:div|section|table|thead|tbody|tr|td)[^>]*>/g) || [];
    for (const m of matches) {
        if (m.startsWith('</')) {
            const tagName = m.slice(2, -1).trim();
            const last = tags.pop();
            console.log(`Line ${i}: Popping ${tagName}, last was ${last}`);
        } else if (!m.endsWith('/>')) {
            const tagName = m.match(/<([^\s>]+)/)[1];
            tags.push(tagName);
            console.log(`Line ${i}: Pushing ${tagName}`);
        }
    }
}
