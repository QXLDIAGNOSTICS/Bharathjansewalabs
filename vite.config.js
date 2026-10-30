import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-static-html',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && (req.url.startsWith('/tests') || req.url.startsWith('/locations'))) {
            const urlPath = req.url.split('?')[0];
            let filePath = path.join(process.cwd(), 'public', urlPath);
            if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
              filePath = path.join(filePath, 'index.html');
            }
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const content = fs.readFileSync(filePath);
              const ext = path.extname(filePath);
              const contentType = ext === '.css' ? 'text/css' : ext === '.js' ? 'application/javascript' : 'text/html';
              res.setHeader('Content-Type', contentType);
              res.end(content);
              return;
            }
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 4000,
    host: true
  }
});
