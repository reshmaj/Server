var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    passportService = require('../../config/passport'),
    passport = require('passport'),
    User = mongoose.model('Users');
    var requireLogin = passport.authenticate('local', { session: false });
    var requireAuth = passport.authenticate('jwt', { session: false });

    module.exports = function (app, config) {
    app.use('/api', router);
    
    router.get('/users', /*requireAuth,*/ function (req, res, next){
        logger.log('Get all users', 'verbose');

       var query = User.find()
       .sort(req.query.order)
       .exec()
       .then(result => {
      	if(result && result.length) {
			res.status(200).json(result);
		} else {
			res.status(404).json({message: "No users"});
		}
       })
       .catch(err => {
         return next(err);
       });
   });

    router.get('/users/:userId', /*requireAuth,*/ function (req, res, next){
        logger.log('Get user'+ req.params.userId, 'verbose');

       User.findById(req.params.userId)
                   .then(user => {
                       if(user){
                           res.status(200).json(user);
                       } else {
                           res.status(404).json({message: "No user found"});
                       }
                   })
                   .catch(error => {
                       return next(error);
                   });
           });    

    router.post('/users', function(req, res, next){
        logger.log('Create user', 'verbose');

       var user = new User(req.body);
        user.save()
       .then(result => {
           res.status(201).json(result);
       })
       .catch( err => {
          return next(err);
       });
     });
  
    router.put('/users/:userId', /*requireAuth,*/ function (req, res, next){
        logger.log('Update user'+ req.params.userId, 'verbose');

           User.findOneAndUpdate({_id: req.params.userId}, 		
           req.body, {new:true, multi:false})
               .then(user => {
                   res.status(200).json(user);
               })
               .catch(error => {
                   return next(error);
               });
       });  

       router.put('/users/password/:userId', /*requireAuth,*/ function(req, res, next){
        logger.log('Update user ' + req.params.userId, 'verbose');
    
        User.findById(req.params.userId)
            .exec()
            .then(function (user) {
                if (req.body.password !== undefined) {
                    user.password = req.body.password;
                }
    
                user.save()
                    .then(function (user) {
                        res.status(200).json(user);
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            })
            .catch(function (err) {
                return next(err);
            });
    });

    router.delete('/users/:userId', /*requireAuth,*/ function (req, res, next){
        logger.log('Delete user'+ req.params.userId, 'verbose');

       User.remove({ _id: req.params.userId })
               .then(user => {
                   res.status(200).json({msg: "User Deleted"});
               })
               .catch(error => {
                   return next(error);
               });
       });

//     router.post('/login', function(req, res, next){
//         console.log(req.body);
//         var email = req.body.email;
//         var password = req.body.password;
  
//         var obj = {'email' : email, 'password' : password};
//       res.status(201).json(obj);
//   });
 router.route('/users/login').post(requireLogin, login);
};
