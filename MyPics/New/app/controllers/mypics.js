var express = require('express'),
router = express.Router(),
logger = require('../../config/logger'),

mongoose = require('mongoose'),
Mypic = mongoose.model('Mypics'),
passportService = require('../../config/passport'),
passport = require('passport'),
multer = require('multer'),
mkdirp = require('mkdirp');
var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app, config) {
     app.use('/api', router);
   
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {      
              var path = config.uploads + req.params.userId + "/";
            mkdirp(path, function(err) {
                if(err){
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        filename: function (req, file, cb) {
            let fileName = file.originalname.split('.');   
            cb(null, fileName[0] + new Date().getTime() + "." +	fileName[fileName.length - 1]);
        }
      });
    
    router.get('/Mypics/user/:userId', /*requireAuth,*/ function (req, res, next){
        logger.log('Get Pictures for a user', 'verbose');

       var query = Mypic.find({UserId:req.params.mypicId})
       .sort(req.query.order)
       .exec()
       .then(result => {
      	if(result && result.length) {
			res.status(200).json(result);
		} else {
			res.status(404).json({message: "No Pictures"});
		}
       })
       .catch(err => {
         return next(err);
       });
   });

    router.get('/Mypics/:mypicId', /*requireAuth,*/ function (req, res, next){
        logger.log('Get user'+ req.params.mypicId, 'verbose');

        Mypic.findById(req.params.mypicId)
                   .then(Mypic => {
                       if(Mypic){
                           res.status(200).json(Mypic);
                       } else {
                           res.status(404).json({message: "No user found"});
                       }
                   })
                   .catch(error => {
                       return next(error);
                   });
           });   

    router.post('/Mypics', function(req, res, next){
        logger.log('Create a picture', 'verbose');

       var mypic = new Mypic(req.body);
       mypic.save()
       .then(result => {
           res.status(201).json(result);
       })
       .catch( err => {
          return next(err);
       });
     });
  
    router.put('/Mypics/:mypicId', /*requireAuth,*/ function (req, res, next){
        logger.log('Update pictures with id mypicid'+ req.params.mypicId, 'verbose');

        Mypic.findOneAndUpdate({_id: req.params.mypicId}, 		
           req.body, {new:true, multi:false})
               .then(Mypic => {
                   res.status(200).json(Mypic);
               })
               .catch(error => {
                   return next(error);
               });
       });  

    router.delete('/Mypics/:mypicId', /*requireAuth,*/  function (req, res, next){
        logger.log('Delete pictures with id mypicid'+ req.params.mypicId, 'verbose');

        Mypic.remove({ _id: req.params.mypicId })
               .then(Mypic => {
                   res.status(200).json({msg: "Picture Deleted"});
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

var upload = multer({ storage: storage });

 router.post('/todos/upload/:userId/:todoId', upload.any(), function(req, res, next){
    logger.log('Upload file for todo ' + req.params.todoId + ' and ' + req.params.userId, 'verbose');
    
    Todo.findById(req.params.todoId, function(err, todo){
       if(err){ 
           return next(err);
         } else {     
             if(req.files){
                 todo.file = {
                     fileName : req.files[0].filename,
                     originalName : req.files[0].originalname,
                     dateUploaded : new Date()
                 };
             }           
             todo.save()
                 .then(todo => {
                     res.status(200).json(todo);
                })
                 .catch(error => {
                     return next(error);
                 });
         }
    });
});
 
};
