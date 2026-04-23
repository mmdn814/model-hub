import fs from 'fs';

let code = fs.readFileSync('src/pages/ModelDetails.tsx', 'utf-8');

// I have double </tbody> ? Let's check.
code = code.replace(/<\/tbody>[\s\r\n]*<\/tbody>/g, '</tbody>');

// What about missing `</div>`? 
// The error says "Unexpected closing 'section' tag does not match opening 'div' tag" at line 403.
// Let's print out the exact sequence of tags leading up to line 403.
const lines = code.split('\n');
const offendingLine = 402; // zero indexed -> 402
let tags = [];
for (let i = 286; i <= offendingLine; i++) {
    const line = lines[i];
    if (line.includes('<section>')) tags.push('section');
    if (line.includes('</section>')) tags.pop();
    // match <div ...> but not <div ... />
    const divOpens = line.match(/<div[^>]*?(?<!\/)>/g);
    if (divOpens) tags.push(...divOpens.map(() => 'div'));
    const divCloses = line.match(/<\/div>/g);
    if (divCloses) tags.length -= divCloses.length;
}

console.log("Tags stack near line 403:", tags);
