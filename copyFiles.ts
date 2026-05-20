import fs from 'fs';
import path from 'path';

function copyRecursiveSync(src: string, dest: string) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

const excludes = ['.git', 'node_modules'];

function copyRepo() {
  const src = path.join(process.cwd(), 'temp-repo');
  const dest = process.cwd();
  
  if (!fs.existsSync(src)) return;
  
  fs.readdirSync(src).forEach((item) => {
    if (excludes.includes(item)) return;
    copyRecursiveSync(path.join(src, item), path.join(dest, item));
  });
}

copyRepo();
console.log("Copy complete.");
