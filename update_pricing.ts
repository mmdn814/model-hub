import fs from 'fs';

let code = fs.readFileSync('src/pages/Pricing.tsx', 'utf-8');

// Replace the hardcoded pricingData with import
const startIdx = code.indexOf('const pricingData = [');
const endIdx = code.indexOf('];\n\nexport default function Pricing() {');

if (startIdx !== -1 && endIdx !== -1) {
  code = code.slice(0, startIdx) + 'import { pricingData } from "@/data/pricing";\n' + code.slice(endIdx + 2);
  fs.writeFileSync('src/pages/Pricing.tsx', code);
  console.log('Successfully updated Pricing.tsx');
} else {
  console.log('Could not find pricingData block in Pricing.tsx');
}
