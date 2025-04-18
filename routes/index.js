const express = require('express');
const router = express.Router();
const config = require('../config/config');

// Home route
router.get('/', (req, res) => {
  res.render('index', {
    title: config.app.name,
    description: config.app.description,
    uptime: config.metrics.uptime,
    serversCount: config.metrics.serversCount,
    supportHours: config.metrics.supportHours,
    discordUrl: config.urls.discord,
    panelUrl: config.urls.panel,
    features: config.featuresData,
    clients: config.clientServers,
    plans: config.pricingPlans,
    serverNodes: config.serverNodes,
    clientNodes: config.clientNodes,
  });
});

module.exports = router; 