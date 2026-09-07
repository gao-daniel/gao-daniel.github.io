const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = process.cwd();
http.createServer((req, res) => {
  let route;
  try { route = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); } catch { res.writeHead(400).end(); return; }
  if (route.endsWith('/')) route += 'index.html';
  const file = path.resolve(root, '.' + route);
  const relative = path.relative(root, file);
  if (relative.startsWith('..') || relative.split(path.sep).some(p => p.startsWith('.')) || !['.html', '.css'].includes(path.extname(file))) { res.writeHead(404).end(); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404).end('Page not found'); return; }
    res.writeHead(200, { 'Content-Type': file.endsWith('.css') ? 'text/css; charset=utf-8' : 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(data);
  });
}).listen(5173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:5173/'));
