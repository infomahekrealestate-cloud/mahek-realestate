import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { sendEnquiryEmail } from './server/mailer.js';

function enquiryApiPlugin() {
  return {
    name: 'enquiry-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/enquiry', async (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });

          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const result = await sendEnquiryEmail(data);

              res.setHeader('Content-Type', 'application/json');
              if (result.success) {
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true, method: 'smtp' }));
              } else {
                res.statusCode = result.needsConfig ? 428 : 500;
                res.end(JSON.stringify(result));
              }
            } catch (err) {
              console.error('Error handling /api/enquiry:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    enquiryApiPlugin()
  ],
});
