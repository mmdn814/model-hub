import fs from 'fs';
const buf = fs.readFileSync('screenshot.png');
console.log('Size:', buf.length);
