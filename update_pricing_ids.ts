import fs from 'fs';

let code = fs.readFileSync('src/data/pricing.ts', 'utf-8');

code = code.replace(/\{ id: "[^"]+", /g, (match) => {
    // extract the ID string
    const idStr = match.match(/id: "([^"]+)"/)[1];
    
    // Split by comma
    const parts = idStr.split(', ');
    if (parts.length > 1) {
        // Just take the second part
        const newId = parts.slice(1).join(', ');
        return match.replace(`id: "${idStr}"`, `id: "${newId}"`);
    }
    return match;
});

fs.writeFileSync('src/data/pricing.ts', code);
console.log('pricing updated!');
