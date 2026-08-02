#!/usr/bin/env node

/**
 * Post-deploy health check
 * Verifies the site is responding after deployment
 */

const https = require("https");
const http = require("http");

const SITE_URL = process.env.SITE_URL || "https://kazzonamarketing.com";
const TIMEOUT_MS = 15000;

function check(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { timeout: TIMEOUT_MS }, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        resolve({ status: res.statusCode, body });
      });
    });
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timed out"));
    });
  });
}

async function main() {
  console.log(`\n🏥 Health check: ${SITE_URL}`);

  try {
    const { status, body } = await check(SITE_URL);

    if (status !== 200) {
      console.error(`❌ Health check FAILED: HTTP ${status}`);
      process.exit(1);
    }

    // Basic content check
    if (!body || body.length < 100) {
      console.error("❌ Health check FAILED: Response body too short");
      process.exit(1);
    }

    console.log(`✅ Health check PASSED: HTTP ${status} (${body.length} bytes)`);
    process.exit(0);
  } catch (err) {
    console.error(`❌ Health check FAILED: ${err.message}`);
    process.exit(1);
  }
}

main();
