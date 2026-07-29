const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

// Remove unused imports and state
code = code.replace(/import \{ ShieldCheck, Globe, Github, Mail, AlertTriangle \} from "lucide-react";/, 'import { ShieldCheck } from "lucide-react";');
code = code.replace(/import \{ useState \} from "react";\n/, '');
code = code.replace(/import \{ Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter \} from "@\/components\/ui\/dialog";\n/, '');

// Remove the mock state variables
const mockStateRegex = /\/\/ Mock states for account linking[\s\S]*?const handleConnect = [\s\S]*?};\n/;
code = code.replace(mockStateRegex, '');

fs.writeFileSync('src/pages/Settings.tsx', code);
console.log('Cleaned up Settings.tsx');
