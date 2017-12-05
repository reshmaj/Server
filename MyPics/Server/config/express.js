var express = require('express');
var logger = require ('./logger');
var morgan = require ('morgan');
var bodyparser = require ('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var glob = require('glob');
var cors = require('cors');



module.exports = function (app, config) {
  app.use(cors({origin: 'http://localhost:9000'}));
      logger.log("Loading Mongoose functionality");
      mongoose.Promise = require('bluebird');
      mongoose.connect(config.db, {useMongoClient: true});
      var db = mongoose.connection;
      db.on('error', function () {
              throw new Error('unable to connect to database at ' + config.db);
       });

  if(process.env.NODE_ENV !== 'test') {
        app.use (morgan('dev'));
        
            mongoose.set('debug', true);
            mongoose.connection.once('open', function callback() {
            logger.log("Mongoose connected to the database");
        });
      
        app.use(function (req, res, next) {
      logger.log('Request from ' + req.connection.remoteAddress, 'info');
      next();
    });  
  }
  app.use(bodyparser.json({limit: '1000mb'}));
  app.use(bodyparser.urlencoded({limit: '1000mb', extended: true}));
  
  //require ('../app/controllers/users')(app, config)
          var models = glob.sync(config.root + '/app/models/*.js');
          models.forEach(function (model) {
                          require(model);
                        });

          var controllers = glob.sync(config.root + '/app/controllers/*.js');
          controllers.forEach(function (controller) {
                          require(controller)(app,config);
                        });



app.get ('/api/users', function(req, res){
res.status(200).json(users);
});

  app.use(express.static(config.root + '/public'));
  
    app.use(function (req, res) {
      res.type('text/plan');
      res.status(404);
      res.send('404 Not Found');
    });
    app.use(function (err, req, res, next) {
      console.log(err);
      if (process.env.NODE_ENV !== 'test') logger.log(err.stack,'error');
      res.type('text/plan');
      if(err.status){
        res.status(err.status).send(err.message);
      } else {
        res.status(500).send('500 Sever Error');
      }
    });
 
  
    logger.log("Starting application");
  
  };
  