var path = require('path'),
rootPath = path.normalize(__dirname + '/..'),
env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: { name: 'ToDos'},
        port: 5000,
        db: 'mongodb://127.0.0.1/todo-dev',
        uploads: rootPath + "/public/uploads/",
        secret: "cayennedlikedhistreats"
        
        
   },
    
    test: {
        root: rootPath,
        app: { name: 'ToDos' },
        port: 4000,
        db: 'mongodb://127.0.0.1/todo-test',
        uploads: rootPath + "/public/uploads/",
        secret: "cayennedlikedhistreats"
        
        
        },

    production: {
        root: rootPath,
        app: { name: 'ToDos'},
        port: 80,
        db: 'mongodb://127.0.0.1/todo',
        uploads: rootPath + "/public/uploads/",
        secret: "cayennedlikedhistreats"
        
     }
    };

module.exports = config[env];