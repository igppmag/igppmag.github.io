import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const file = path.join(process.cwd(), 'counter.json');

async function readCount() {
  try {
    const txt = await fs.readFile(file, 'utf8');
    return JSON.parse(txt).count ?? 0;
  } catch {
    return 0;
  }
}
async function writeCount(n) {
  await fs.writeFile(file, JSON.stringify({ count: n }), 'utf8');
}

app.get('/api/views', async (_req, res) => {
  // naive file-based counter; fine for small sites
  const n = (await readCount()) + 1;
  await writeCount(n);
  res.set('Cache-Control', 'no-store');
  res.json({ value: n });
});

app.listen(3000, () => console.log('Counter API on http://localhost:3000'));
