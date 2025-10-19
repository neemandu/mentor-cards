const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Paths to .env.example and .env files
const envExamplePath = path.resolve(process.cwd(), '.env.example');
const envPath = path.resolve(process.cwd(), '.env');

// Check if .env.example exists
if (!fs.existsSync(envExamplePath)) {
  console.error('❌ File .env.example not found.');
  process.exit(1);
}

// Parse .env.example
const example = dotenv.parse(fs.readFileSync(envExamplePath, 'utf8'));

// Parse existing .env or create empty object if it does not exist
const current = fs.existsSync(envPath)
  ? dotenv.parse(fs.readFileSync(envPath, 'utf8'))
  : {};

let updated = { ...current };

// Add missing keys from .env.example
Object.entries(example).forEach(([key, value]) => {
  if (!(key in updated)) {
    // Priority: process.env > existing .env value > .env.example
    const newValue = process.env[key] || current[key] || value;
    updated[key] = newValue;
    console.log(`➕ Added new key: ${key}=${newValue}`);
  }
});

// Logging messages
if (!fs.existsSync(envPath)) {
  console.log('🆕 Created new .env from .env.example...');
} else if (Object.keys(updated).length === Object.keys(current).length) {
  console.log('✅ All keys are up-to-date. No changes.');
}

// Generate new .env content
const newEnvContent = Object.entries(updated)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

// Write to .env file
fs.writeFileSync(envPath, newEnvContent + '\n', 'utf8');
console.log('✅ .env file updated successfully.');
