var express = require('express'),
config = require('./config/config'); 

//Create the express object
var app = express();    

//Configure express object
require('./config/express')(app, config);
console.log("Creating HTTP server on port: " + config.port);

require('http').createServer(app).listen(config.port, function () {
console.log("HTTP Server listening on port: " + config.port + ", in " + app.get('env') + " mode");
});

