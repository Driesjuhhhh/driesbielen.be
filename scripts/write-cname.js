import fs from 'fs';
import path from 'path';

// Domain to write into CNAME — update if you use a different domain
const DOMAIN = 'driesbielen.be';

const outDir = path.resolve(process.cwd(), 'dist');
const cnamePath = path.join(outDir, 'CNAME');

try {
  if (!fs.existsSync(outDir)) {
    console.warn('Warning: dist folder does not exist. Run the build first.');
  } else {
    fs.writeFileSync(cnamePath, DOMAIN + '\n', 'utf8');
    console.log(`Wrote CNAME -> ${cnamePath}`);
  }
} catch (err) {
  console.error('Failed to write CNAME file:', err);
  process.exit(1);
}
