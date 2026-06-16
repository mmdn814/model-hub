const fs = require('fs');
const lines = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8').split('\n');
// We need to find the start and end indices
const startIndex = lines.findIndex(l => l.includes(') : processingMode === "async" ? ('));
const endIndex = lines.findIndex((l, i) => i > startIndex && l.includes('Level 3: Usage Charts')) - 2;

if (startIndex !== -1 && endIndex !== -1) {
  lines.splice(startIndex, endIndex - startIndex + 1);
  fs.writeFileSync('src/pages/Dashboard.tsx', lines.join('\n'));
  console.log("Deleted from", startIndex, "to", endIndex);
} else {
  console.log("Could not find boundaries", startIndex, endIndex);
}
