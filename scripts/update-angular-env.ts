const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Paths to environment files
const envDevPath = path.resolve(process.cwd(), 'src/environments/environment.ts');
const envProdPath = path.resolve(process.cwd(), 'src/environments/environment.prod.ts');

// Path to the .env file
const envPath = path.resolve(process.cwd(), '.env'); // you can use .env.production for prod

// Load .env file
const envConfig = dotenv.parse(fs.readFileSync(envPath, 'utf8'));

// Function to update an environment file
function updateEnvironmentFile(filePath, isProd) {
  let currentContent = '';
  
  // Read existing file or create a default template
  if (fs.existsSync(filePath)) {
    currentContent = fs.readFileSync(filePath, 'utf8');
  } else {
    currentContent = 'export const environment = {\n  production: ' + isProd + '\n};\n';
  }

  // Parse the existing environment object
  const match = currentContent.match(/export const environment\s*=\s*(\{[\s\S]*\});/);
  let envObj = {};

  if (match) {
    try {
      // eslint-disable-next-line no-eval
      envObj = eval('(' + match[1] + ')'); // Convert string object to JS object
    } catch (err) {
      console.error('❌ Error parsing ' + filePath, err);
    }
  }

  // Add or update values from .env
  Object.keys(envConfig).forEach(function(key) {
    const value = envConfig[key];
    if (!key || key.startsWith('npm_')) return; // skip system keys
    envObj[key.toLowerCase()] = isBoolean(value) ? value === 'true' : value;
  });

  // Convert back to TypeScript file
  const newContent =
    'export const environment = ' +
    JSON.stringify(envObj, null, 2)
      .replace(/"([^"]+)":/g, '$1:') // remove quotes from keys
      .replace(/"([^"]*)"/g, "'$1'") + // replace double quotes with single quotes
    ';\n';

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('✅ ' + filePath + ' updated');
}

// Helper function to check if a string is boolean
function isBoolean(str) {
  return ['true', 'false'].includes(str.toLowerCase());
}

// Update both dev and prod environment files
updateEnvironmentFile(envDevPath, false);
updateEnvironmentFile(envProdPath, true);
