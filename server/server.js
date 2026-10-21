import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { sendEnquiryEmail, verifySmtpConnection } from './mailer.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  // CORS Headers for API requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  // 1. SMTP Test / Health Endpoint
  if (req.url === '/api/test-smtp' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    try {
      const result = await verifySmtpConnection();
      res.statusCode = result.success ? 200 : 400;
      return res.end(JSON.stringify(result));
    } catch (err) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // 2. SMTP Lead Dispatch Endpoint
  if (req.url === '/api/enquiry' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      res.setHeader('Content-Type', 'application/json');
      try {
        const data = JSON.parse(body || '{}');
        const result = await sendEnquiryEmail(data);
        if (result.success) {
          res.statusCode = 200;
          return res.end(JSON.stringify({ success: true, method: 'smtp', recipient: result.recipient }));
        } else {
          res.statusCode = result.needsConfig ? 428 : 500;
          return res.end(JSON.stringify(result));
        }
      } catch (err) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // 3. Static Files Serving (from dist directory if built)
  let filePath = path.join(distDir, req.url.split('?')[0]);
  if (filePath.endsWith(path.sep) || req.url === '/') {
    filePath = path.join(distDir, 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.setHeader('Content-Type', contentType);
      fs.createReadStream(filePath).pipe(res);
    } else {
      // SPA Fallback: serve index.html for unknown non-asset routes
      const indexPath = path.join(distDir, 'index.html');
      fs.stat(indexPath, (indexErr, indexStats) => {
        if (!indexErr && indexStats.isFile()) {
          res.setHeader('Content-Type', 'text/html');
          fs.createReadStream(indexPath).pipe(res);
        } else {
          res.statusCode = 404;
          res.end('Not Found (Please run "npm run build" first)');
        }
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Mahek Real Estate Production Server Running`);
  console.log(`• Local:   http://localhost:${PORT}`);
  console.log(`• SMTP API: http://localhost:${PORT}/api/enquiry`);
  console.log(`======================================================\n`);
});
