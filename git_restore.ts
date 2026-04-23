import { execSync } from 'child_process';
import fs from 'fs';

try {
    const originalCode = execSync('git show HEAD:src/pages/ModelDetails.tsx').toString();
    fs.writeFileSync('src/pages/ModelDetails.tsx', originalCode);
    console.log("Restored ModelDetails.tsx from git HEAD");
} catch (e) {
    console.log("Error:", e);
}
