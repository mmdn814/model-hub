const fs = require('fs');
let code = fs.readFileSync('src/pages/Login.tsx', 'utf8');

code = code.replace(/import \{ Github, Mail, ArrowRight, CheckCircle2 \} from "lucide-react";/, 'import { Github, Mail, ArrowRight } from "lucide-react";');
code = code.replace(/import \{ Popover, PopoverContent, PopoverTrigger \} from "@\/components\/ui\/popover";\n/, '');

fs.writeFileSync('src/pages/Login.tsx', code);
console.log('Cleaned up Login.tsx');
