import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import decrementStockHandler from './api/decrement-stock.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const ROOT = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
    try {
        const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
        let pathname = decodeURIComponent(parsedUrl.pathname);
        if (pathname === '/api/decrement-stock') {
            decrementStockHandler(req, res);
            return;
        }
        if (pathname === '/') pathname = '/index.html';
        if (pathname === '/admin' || pathname === '/admin/') pathname = '/admin.html';
        if (pathname.endsWith('/')) pathname += 'index.html';

        const filePath = path.join(ROOT, pathname);
        if (!filePath.startsWith(ROOT)) {
            res.writeHead(403);
            res.end('Forbidden');
            return;
        }

        fs.stat(filePath, (err, stats) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('404 Not Found');
                return;
            }

            if (stats.isDirectory()) {
                res.writeHead(301, { 'Location': parsedUrl.pathname + '/' });
                res.end();
                return;
            }
            const ext = path.extname(filePath).toLowerCase();
            res.writeHead(200, {
                'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Access-Control-Allow-Origin': '*'
            });
            fs.createReadStream(filePath).pipe(res);
        });
    } catch (e) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Server Error');
    }
});

// Listening without host specified binds to :: (all IPv6 and IPv4 interfaces)
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/ and http://127.0.0.1:${PORT}/`);
});

