var path = require('path'),    
rootPath = path.normalize(__dirname + '/..'),    
//Uses development configuration based on NODE_ENV environment varaible
env = process.env.NODE_ENV || 'development';

var config = {  
development: {    
            root: rootPath,    
            app: {name: 'exam'},    
            port: 5000,  
            db: 'mongodb://127.0.0.1/exam-dev' 
 },  

  };

  // Exports the config
 module.exports = config[env];
