#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔍 [BJSL Catalogue Validator] Running validation on data registers...\n');

let errors = 0;
let warnings = 0;

// 1. Validate value-packages.json
const packagesPath = path.join(rootDir, 'data', 'value-packages.json');
if (!fs.existsSync(packagesPath)) {
  console.error('❌ Missing data/value-packages.json');
  process.exit(1);
}

try {
  const pkgData = JSON.parse(fs.readFileSync(packagesPath, 'utf8'));
  const packages = pkgData.packages || [];
  console.log(`📦 Found ${packages.length} value packages in data/value-packages.json`);

  if (packages.length < 20) {
    console.warn(`⚠️ Warning: Expected 20 value packages, found ${packages.length}`);
    warnings++;
  }

  packages.forEach((pkg, index) => {
    if (!pkg.slug) {
      console.error(`❌ Package at index ${index} missing required field 'slug'`);
      errors++;
    }
    if (!pkg.name) {
      console.error(`❌ Package '${pkg.slug || index}' missing required field 'name'`);
      errors++;
    }
    if (!pkg.tests || !Array.isArray(pkg.tests) || pkg.tests.length === 0) {
      console.error(`❌ Package '${pkg.slug}' must contain non-empty 'tests' array`);
      errors++;
    }
    if (!pkg.description) {
      console.error(`❌ Package '${pkg.slug}' missing 'description'`);
      errors++;
    }
    if (!pkg.answer) {
      console.error(`❌ Package '${pkg.slug}' missing direct-answer summary 'answer'`);
      errors++;
    }
    if (pkg.published === true) {
      if (pkg.priceINR === null || pkg.priceINR === undefined || pkg.priceINR <= 0) {
        console.error(`❌ Published package '${pkg.slug}' cannot have null or zero priceINR`);
        errors++;
      }
      if (pkg.tatHours === null || pkg.tatHours === undefined || pkg.tatHours <= 0) {
        console.error(`❌ Published package '${pkg.slug}' must have valid positive tatHours`);
        errors++;
      }
    }
  });
} catch (err) {
  console.error('❌ Failed to parse data/value-packages.json:', err.message);
  errors++;
}

// 2. Validate locality-targets.json
const localitiesPath = path.join(rootDir, 'data', 'locality-targets.json');
if (!fs.existsSync(localitiesPath)) {
  console.error('❌ Missing data/locality-targets.json');
  process.exit(1);
}

try {
  const locData = JSON.parse(fs.readFileSync(localitiesPath, 'utf8'));
  const localities = locData.localities || [];
  console.log(`📍 Found ${localities.length} locality targets in data/locality-targets.json`);

  localities.forEach((loc, index) => {
    if (!loc.slug || !loc.name || !loc.pincode || !loc.zone) {
      console.error(`❌ Locality at index ${index} missing essential attributes (slug, name, pincode, zone)`);
      errors++;
    }
    if (!/^\d{6}$/.test(loc.pincode)) {
      console.error(`❌ Locality '${loc.name}' has invalid Indian PIN code format: '${loc.pincode}'`);
      errors++;
    }
  });
} catch (err) {
  console.error('❌ Failed to parse data/locality-targets.json:', err.message);
  errors++;
}

// 3. Check for forbidden unverified marketing claims in public files
console.log('\n🛡️ Checking for prohibited compliance claims across public and source files...');
const filesToCheck = [
  'index.html',
  'src/data/mockData.js',
  'src/pages/HomePage.jsx',
  'src/pages/Home.jsx',
  'src/pages/CentresPage.jsx'
];

const prohibitedPatterns = [
  { pattern: /NEDL Certified/i, msg: "Prohibited claim: 'NEDL Certified' (ICMR NEDL 2025 is a guideline, not a lab certification)" },
  { pattern: /India'?s cheapest lab/i, msg: "Prohibited claim: 'India's cheapest lab' (unsubstantiated superlative)" },
  { pattern: /100% NABL accuracy guaranteed/i, msg: "Prohibited claim: '100% NABL accuracy guaranteed' (violates clinical compliance)" }
];

filesToCheck.forEach(fileRel => {
  const absPath = path.join(rootDir, fileRel);
  if (fs.existsSync(absPath)) {
    const content = fs.readFileSync(absPath, 'utf8');
    prohibitedPatterns.forEach(({ pattern, msg }) => {
      if (pattern.test(content)) {
        console.error(`❌ ${fileRel}: ${msg}`);
        errors++;
      }
    });
  }
});

console.log(`\n==================================================`);
if (errors === 0) {
  console.log(`✅ [BJSL Catalogue Validator] SUCCESS: 0 errors, ${warnings} warning(s).`);
  process.exit(0);
} else {
  console.error(`❌ [BJSL Catalogue Validator] FAILED with ${errors} error(s).`);
  process.exit(1);
}
