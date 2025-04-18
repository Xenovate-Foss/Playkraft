#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Load existing config
const config = require('./config/config');

console.log(`


================================================================================

██████╗ ██╗      █████╗ ██╗   ██╗    ██╗  ██╗██████╗  █████╗ ███████╗████████╗
██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝    ██║ ██╔╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
██████╔╝██║     ███████║ ╚████╔╝     █████╔╝ ██████╔╝███████║█████╗     ██║   
██╔═══╝ ██║     ██╔══██║  ╚██╔╝      ██╔═██╗ ██╔══██╗██╔══██║██╔══╝     ██║   
██║     ███████╗██║  ██║   ██║       ██║  ██╗██║  ██║██║  ██║██║        ██║   
╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝        ╚═╝   
                                                                              
By Xenovate Team - We Craft Code!
================================================================================
Let's setup Your Hosting Infomations In PlayKraft
`);

// Check for dependencies
console.log('Checking NPM...');
try {
  execSync('npm --version', { stdio: 'ignore' });
  console.log('✅ npm is installed');
} catch (error) {
  console.error('❌ npm is not installed. Please install Node.js and npm first.');
  process.exit(1);
}

// Check for dependencies
console.log('Checking dependencies...');
try {
  execSync('npm i', { stdio: 'ignore' });
  console.log('✅ Dependencies is installed');
} catch (error) {
  console.error('❌ Something Went Wrong: ' + error );
  process.exit(1);
}
// Check if .env file exists, if not create it
const envPath = path.join(__dirname, '.env');
let envExists = fs.existsSync(envPath);

async function setupEnvFile() {
  console.log('\nSetting up environment variables...');
  
  const env = {};
  
  if (envExists) {
    console.log('Found existing .env file. We will update it with your choices.');
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const parts = line.split('=');
      if (parts.length === 2) {
        env[parts[0].trim()] = parts[1].trim();
      }
    });
  }
  
  // Server settings
  env.PORT = await promptWithDefault('Server port', env.PORT || config.server.port);
  env.NODE_ENV = await promptWithDefault('Environment (Leave Empty)', env.NODE_ENV || config.server.env);
  
  // App settings
  env.APP_NAME = await promptWithDefault('Hosting name', env.APP_NAME || config.app.name);
  env.APP_DESCRIPTION = await promptWithDefault('Hosting description', env.APP_DESCRIPTION || config.app.description);
  env.CONTACT_EMAIL = await promptWithDefault('Contact email', env.CONTACT_EMAIL || config.app.contactEmail);
  
  // URLs
  env.DISCORD_URL = await promptWithDefault('Discord URL', env.DISCORD_URL || config.urls.discord);
  env.PANEL_URL = await promptWithDefault('Panel URL', env.PANEL_URL || config.urls.panel);
  
  // Metrics
  env.UPTIME = await promptWithDefault('Uptime percentage', env.UPTIME || config.metrics.uptime);
  env.SERVERS_COUNT = await promptWithDefault('Servers count', env.SERVERS_COUNT || config.metrics.serversCount);
  env.SUPPORT_HOURS = await promptWithDefault('Support hours', env.SUPPORT_HOURS || config.metrics.supportHours);
 
  // Write to .env file
  let envContent = '';
  for (const [key, value] of Object.entries(env)) {
    envContent += `${key}=${value}\n`;
  }
  
  fs.writeFileSync(envPath, envContent);
  console.log(`✅ Environment variables saved to ${envPath}`);
}

async function promptWithDefault(question, defaultValue, isPassword = false) {
  return new Promise((resolve) => {
    const defaultDisplay = defaultValue ? ` (${isPassword ? '********' : defaultValue})` : '';
    rl.question(`${question}${defaultDisplay}: `, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

async function promptYesNo(question, defaultValue = false) {
  return new Promise((resolve) => {
    const defaultDisplay = defaultValue ? 'Y/n' : 'y/N';
    rl.question(`${question} [${defaultDisplay}]: `, (answer) => {
      if (answer.trim() === '') {
        resolve(defaultValue);
      } else {
        resolve(['y', 'yes', 'true'].includes(answer.toLowerCase()));
      }
    });
  });
}

async function checkDirectories() {
  console.log('\nChecking required directories...');
  
  const directories = [
    'public',
    'public/images',
    'logs'
  ];
  
  for (const dir of directories) {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
      console.log(`Creating ${dir} directory...`);
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
  
  console.log('✅ All required directories exist');
}

async function verifyAssets() {
  console.log('\nVerifying assets...');
  
  // Check if feature icons exist
  const featureIconsPath = path.join(__dirname, 'public/images/features.png');
  if (!fs.existsSync(featureIconsPath)) {
    console.log('⚠️ Features icon not found at public/images/features.png');
  }
  
  // Check if client server images exist
  for (const server of config.clientServers) {
    const imagePath = path.join(__dirname, `public/images/${server.image}`);
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️ Client server image not found: ${server.image}`);
    }
  }
}

async function setupComplete() {
  console.log(`
================================================================

  ___      _                ___                _     _       _ 
 / __| ___| |_ _  _ _ __   / __|___ _ __  _ __| |___| |_ ___| |
 \__ \/ -_)  _| || | '_ \ | (__/ _ \ '  \| '_ \ / -_)  _/ -_)_|
 |___/\___|\__|\_,_| .__/  \___\___/_|_|_| .__/_\___|\__\___(_)
                  |_|                   |_|                   

================================================================

Your PlayKraft server has been configured successfully.

Please Config Your Plans And Node In config/config.js

Create the Ticket In Our Discord Server for more information.
`);
  rl.close();
}

async function main() {
  try {
    await setupEnvFile();
    await checkDirectories();
    await verifyAssets();
    await setupComplete();
  } catch (error) {
    console.error('An error occurred during installation:', error);
    rl.close();
    process.exit(1);
  }
}

main(); 