const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to create directories if they don't exist
function createDirIfNotExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dirPath}`);
  }
}

// Create necessary directories
const directories = [
  'public/css',
  'public/js',
  'public/images',
  'views/layouts',
  'routes',
  'config'
];

console.log('🚀 Initializing PlayKraft Hosting project...');

directories.forEach(dir => {
  createDirIfNotExists(path.join(__dirname, dir));
});

// Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully!');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
}

console.log(`
🎉 Setup completed!

To start the development server:
  npm run dev

To start the production server:
  npm start

Remember to:
1. Add required images to public/images folder:
   - whtite.png (white logo)
   - logo.png (original logo)
   - black.png (client showcase image)
   - steve.png (character image)
   - features.png (feature icon)
   - favicon.png (site favicon)
2. Customize the environment variables in .env
3. Check config/config.js for centralized configuration settings
`); 