var express = require('express');
var config = require('./config/config');   
var logger = require('./config/logger');
 
var app = express();   

require('./config/express')(app, config);
 
//console.log("Creating HTTP server on port: " + config.port);
require('http').createServer(app).listen(config.port, function () {
    logger.log("HTTP Server listening on port: " + config.port + ", in " + app.get('env') + " mode");
});
 
module.exports = app;