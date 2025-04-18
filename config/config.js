require('dotenv').config();

/**
 * Configuration file that centralizes all environment variables
 * This makes it easier to access and manage variables throughout the application
 */
module.exports = {


  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },
  
  // Application settings
  app: {
    name: process.env.APP_NAME || 'PlayKraft',
    description: process.env.APP_DESCRIPTION || 'Premium Minecraft Server Hosting',
    contactEmail: process.env.CONTACT_EMAIL || 'support@playkraft.com'
  },
  
  // External URLs
  urls: {
    discord: process.env.DISCORD_URL || 'https://discord.gg/playkraft',
    panel: process.env.PANEL_URL || 'https://panel.playkraft.com'
  },
  
  // Service metrics
  metrics: {
    uptime: process.env.UPTIME || '99.9',
    serversCount: process.env.SERVERS_COUNT || '5000',
    supportHours: process.env.SUPPORT_HOURS || '24/7'
  },
  

  // Features data
  featuresData: [
    {
      title: 'High Performance',
      description: 'Lag-free gaming experience with powerful servers and optimized configurations',
      icon: 'features.png'
    },
    {
      title: 'DDoS Protection',
      description: 'Enterprise-grade protection against malicious attacks keeps your server running',
      icon: 'features.png'
    },
    {
      title: 'One-Click Installs',
      description: 'Install modpacks, plugins, and server types with just a single click',
      icon: 'features.png'
    },
    {
      title: '24/7 Support',
      description: 'Our expert team is always available to help with any issues you encounter',
      icon: 'features.png'
    }
  ],

  // Client servers showcase data
  clientServers: [
    {
      name: 'Hypixel Network',
      ip: 'mc.hypixel.net',
      description: 'One of the largest and most popular Minecraft server networks.',
      image: 'paidsrv1.png'
    },
    {
      name: 'SurvivalMC',
      ip: 'play.survivalmc.net',
      description: 'Premium survival experience with custom plugins and friendly community.',
      image: 'paidsrv2.png'
    },
    {
      name: 'CreativeCraft',
      ip: 'mc.creativecraft.com',
      description: 'Build your dreams on one of the most advanced creative servers.',
      image: 'paidsrv3.png'
    }
  ],

  // Pricing plans data
  pricingPlans: [
    {
      name: 'Starter',
      price: '$3.99',
      ram: '2GB',
      storage: '20GB SSD',
      slots: '10',
      features: ['Unlimited Traffic', 'DDoS Protection', 'Automated Backups', 'Control Panel']
    },
    {
      name: 'Pro',
      price: '$8.99',
      ram: '6GB',
      storage: '80GB SSD',
      slots: '40',
      features: ['Unlimited Traffic', 'DDoS Protection', 'Automated Backups', 'Control Panel', 'ModPack Support', 'Priority Support']
    },
    {
      name: 'Ultimate',
      price: '$15.99',
      ram: '12GB',
      storage: '160GB SSD',
      slots: '100',
      features: ['Unlimited Traffic', 'DDoS Protection', 'Automated Backups', 'Control Panel', 'ModPack Support', 'Priority Support', 'Custom Domain', 'Dedicated IP', 'Sub-Users Access', 'Advanced Console']
    }
  ],
  

  // Client-side formatted node data
  serverNodes: [
    { 
      id: 'node1', 
      name: 'India (Mumbai)', 
      location: 'Mumbai, India', 
      specs: 'AMD Ryzen 9 5950X, 128GB DDR4, NVMe SSD', 
      flag: '🇺🇸', 
      url: 'https://panel.playkraft.com/node1' 
    },
    { 
      id: 'node2', 
      name: 'US West (Los Angeles)', 
      location: 'Los Angeles, USA', 
      specs: 'Intel Core i9-12900K, 128GB DDR4, NVMe SSD', 
      flag: '🇺🇸', 
      url: 'https://panel.playkraft.com/node2' 
    },
    { 
      id: 'node3', 
      name: 'Europe (Frankfurt)', 
      location: 'Frankfurt, Germany', 
      specs: 'AMD EPYC 7763, 256GB DDR4 ECC, Enterprise NVMe SSD', 
      flag: '🇩🇪', 
      url: 'https://panel.playkraft.com/node3' 
    },
    { 
      id: 'node4', 
      name: 'Asia (Singapore)', 
      location: 'Singapore', 
      specs: 'Intel Xeon Platinum 8380, 192GB DDR4 ECC, Enterprise NVMe SSD', 
      flag: '🇸🇬', 
      url: 'https://panel.playkraft.com/node4' 
    }
  ]
};

