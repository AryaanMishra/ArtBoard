#!/usr/bin/env node

/**
 * ArtBoard - Project Verification Checklist
 * 
 * This file verifies all core project files exist and are properly configured.
 * Run this to ensure your project is complete before starting.
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m'
};

function check(name, filePath) {
  const fullPath = path.join(__dirname, filePath);
  const exists = fs.existsSync(fullPath);
  const status = exists ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
  console.log(`${status} ${name}`);
  return exists;
}

console.log(`\n${colors.bold}${colors.blue}🎨 ArtBoard - Project Verification${colors.reset}\n`);

let passed = 0;
let failed = 0;

// Frontend files
console.log(`${colors.bold}Frontend:${colors.reset}`);
if (check('  src/App.tsx', 'frontend/src/App.tsx')) passed++; else failed++;
if (check('  src/store.ts', 'frontend/src/store.ts')) passed++; else failed++;
if (check('  src/components/Canvas.tsx', 'frontend/src/components/Canvas.tsx')) passed++; else failed++;
if (check('  src/components/Toolbar.tsx', 'frontend/src/components/Toolbar.tsx')) passed++; else failed++;
if (check('  src/components/UserPanel.tsx', 'frontend/src/components/UserPanel.tsx')) passed++; else failed++;
if (check('  package.json', 'frontend/package.json')) passed++; else failed++;
if (check('  vite.config.ts', 'frontend/vite.config.ts')) passed++; else failed++;

// Backend files
console.log(`\n${colors.bold}Backend:${colors.reset}`);
if (check('  server.js', 'backend/server.js')) passed++; else failed++;
if (check('  package.json', 'backend/package.json')) passed++; else failed++;
if (check('  .env.example', 'backend/.env.example')) passed++; else failed++;

// Documentation
console.log(`\n${colors.bold}Documentation:${colors.reset}`);
if (check('  README-MAIN.md', 'README-MAIN.md')) passed++; else failed++;
if (check('  QUICKREF.md', 'QUICKREF.md')) passed++; else failed++;
if (check('  ARCHITECTURE.md', 'ARCHITECTURE.md')) passed++; else failed++;
if (check('  DEPLOYMENT.md', 'DEPLOYMENT.md')) passed++; else failed++;
if (check('  GETTING_STARTED.md', 'GETTING_STARTED.md')) passed++; else failed++;

// Config files
console.log(`\n${colors.bold}Configuration:${colors.reset}`);
if (check('  .gitignore', '.gitignore')) passed++; else failed++;
if (check('  .github/workflows/deploy-frontend.yml', '.github/workflows/deploy-frontend.yml')) passed++; else failed++;
if (check('  .github/workflows/deploy-backend.yml', '.github/workflows/deploy-backend.yml')) passed++; else failed++;

// Node modules
console.log(`\n${colors.bold}Dependencies:${colors.reset}`);
const frontendModules = fs.existsSync(path.join(__dirname, 'frontend/node_modules'));
const backendModules = fs.existsSync(path.join(__dirname, 'backend/node_modules'));
console.log(`${frontendModules ? colors.green + '✓' : colors.red + '✗'} ${colors.reset}frontend/node_modules`);
console.log(`${backendModules ? colors.green + '✓' : colors.red + '✗'} ${colors.reset}backend/node_modules`);

// Summary
console.log(`\n${colors.bold}Summary:${colors.reset}`);
console.log(`${colors.green}✓ Files: ${passed}${colors.reset}`);
if (failed > 0) {
  console.log(`${colors.red}✗ Missing: ${failed}${colors.reset}`);
} else {
  console.log(`${colors.green}✓ All files present!${colors.reset}`);
}

if (frontendModules && backendModules) {
  console.log(`${colors.green}✓ Dependencies installed${colors.reset}`);
} else {
  console.log(`${colors.yellow}⚠ Some dependencies not installed${colors.reset}`);
  console.log(`  Run: npm install`);
}

// Next steps
console.log(`\n${colors.bold}Next Steps:${colors.reset}`);
if (process.platform === 'win32') {
  console.log(`  1. Run: ${colors.blue}start.bat${colors.reset}`);
} else {
  console.log(`  1. Run: ${colors.blue}./start.sh${colors.reset}`);
}
console.log(`  2. Open: ${colors.blue}http://localhost:3000${colors.reset}`);
console.log(`  3. Start drawing! 🎨\n`);

process.exit(failed > 0 ? 1 : 0);
