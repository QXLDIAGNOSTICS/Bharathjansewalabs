import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const portsToTry = [4000, 3000, 5173, 8080, 8000, 3001, 3002, 5174, 8081, 9000, 9090, 0];

function createServer(portIndex = 0) {
  if (portIndex >= portsToTry.length) {
    console.error('No available ports found.');
    return;
  }

  const PORT = portsToTry[portIndex];
  const server = http.createServer((req, res) => {
    const distDir = path.join(__dirname, 'dist');
    const publicDir = path.join(__dirname, 'public');
    const baseDir = fs.existsSync(distDir) ? distDir : publicDir;
    
    let filePath = path.join(baseDir, req.url === '/' ? 'index.html' : req.url);

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        filePath = path.join(baseDir, 'index.html');
      }

      const ext = path.extname(filePath);
      let contentType = 'text/html';
      if (ext === '.js') contentType = 'text/javascript';
      if (ext === '.css') contentType = 'text/css';
      if (ext === '.json') contentType = 'application/json';
      if (ext === '.png') contentType = 'image/png';
      if (ext === '.webp') contentType = 'image/webp';
      if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
      if (ext === '.svg') contentType = 'image/svg+xml';
      if (ext === '.ico') contentType = 'image/x-icon';

      fs.readFile(filePath, (error, content) => {
        if (error) {
          res.writeHead(500);
          res.end('Server Error');
        } else {
          res.writeHead(200, {
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
            'Pragma': 'no-cache',
            'Expires': '0'
          });
          res.end(content, 'utf-8');
        }
      });
    });
  });

  server.on('error', (e) => {
    console.log(`Port ${PORT} failed:`, e.code || e.message);
    server.close();
    createServer(portIndex + 1);
  });

  server.listen(PORT, '127.0.0.1', () => {
    const actualPort = server.address().port;
    console.log(`\n==================================================`);
    console.log(`🩺 BHARATH JAN SEWA LABS PLATFORM IS LIVE!`);
    console.log(`👉 Local URL: http://localhost:${actualPort}`);
    console.log(`==================================================\n`);
  });
}

createServer(0);
