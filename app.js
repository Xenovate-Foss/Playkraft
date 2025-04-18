const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const config = require('./config/config');

// Initialize Express
const app = express();
const PORT = config.server.port;

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const indexRoutes = require('./routes/index');

// Use routes
app.use('/', indexRoutes);

// Start server
app.listen(PORT, () => {
  console.clear();
  console.log(`
    

    
██████╗ ██╗      █████╗ ██╗   ██╗    ██╗  ██╗██████╗  █████╗ ███████╗████████╗
██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝    ██║ ██╔╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
██████╔╝██║     ███████║ ╚████╔╝     █████╔╝ ██████╔╝███████║█████╗     ██║   
██╔═══╝ ██║     ██╔══██║  ╚██╔╝      ██╔═██╗ ██╔══██╗██╔══██║██╔══╝     ██║   
██║     ███████╗██║  ██║   ██║       ██║  ██╗██║  ██║██║  ██║██║        ██║   
╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝        ╚═╝   

     PlayKraft Hosting Templete
     Buyed By : ${config.app.name}
     ---------------------------
         Thank For Buying!
 ${config.app.name} : ${config.app.description}

  
      `);
  console.log(`Port :  ${PORT} , Mode : ${config.server.env} mode`);
  console.log(`Visit http://localhost:${PORT} to view the application`);
}); 