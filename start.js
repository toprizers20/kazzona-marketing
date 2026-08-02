const path = require('path');

// Force production mode
process.env.NODE_ENV = 'production';
process.chdir(__dirname);

const port = parseInt(process.env.PORT, 10) || 3000;
const hostname = '0.0.0.0';

console.log(`[kazzona] Starting server on ${hostname}:${port}...`);
console.log(`[kazzona] Working directory: ${__dirname}`);
console.log(`[kazzona] Node version: ${process.version}`);

// Use Next.js internal start server (same as "next start" but more reliable)
require('next');
const { startServer } = require('next/dist/server/lib/start-server');

startServer({
  dir: __dirname,
  isDev: false,
  hostname,
  port,
  allowRetry: false,
}).then(() => {
  console.log(`[kazzona] Server ready on http://${hostname}:${port}`);
}).catch((err) => {
  console.error('[kazzona] FATAL: Server failed to start:', err);
  process.exit(1);
});
