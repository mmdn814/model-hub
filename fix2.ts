import fs from 'fs';

let code = fs.readFileSync('src/pages/ModelDetails.tsx', 'utf-8');

// I just need to remove one `</section>` around line 462.
code = code.replace(/<\/section>\s*<\/section>/, '</section>');

fs.writeFileSync('src/pages/ModelDetails.tsx', code);
console.log("Removed duplicate </section>");
