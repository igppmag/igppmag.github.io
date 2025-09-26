// server.js
import express from 'express';
let count = 0;
const app = express();

app.get('/views', (_req, res) => {
  count += 1;
  res.set('Cache-Control', 'no-store');
  res.json({ value: count });
});

app.listen(3000, () => console.log('http://localhost:3000'));
