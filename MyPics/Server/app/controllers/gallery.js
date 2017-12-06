var express = require('express'),
router = express.Router(),
logger = require('../../config/logger'),
mongoose = require('mongoose'),
Mygallery = mongoose.model('Galleries'),
passportService = require('../../config/passport'),
passport = require('passport'),
multer = require('multer'),
mkdirp = require('mkdirp');
requireAuth = passport.authenticate('jwt', { session: false });  

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
            cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
        }
      });
    
    router.get('/Galleries/user/:userId', /*requireAuth,*/ function (req, res, next){
        logger.log('Get photos for a user', 'verbose');

       var query = Mygallery.find({UserId:req.params.mygalleryId})
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

   router.get('/Galleries', /*requireAuth,*/ function (req, res, next){
    logger.log('Get user', 'verbose');

    Mygallery.find()
               .then(Mygallery => {
                   if(Mygallery){
                       res.status(200).json(Mygallery);
                   } else {
                       res.status(404).json({message: "No user found"});
                   }
               })
               .catch(error => {
                   return next(error);
               });
       });

    router.get('/Galleries/:mygalleryId', /*requireAuth,*/ function (req, res, next){
        logger.log('Get user'+ req.params.mygalleryId, 'verbose');

        Mygallery.find({Id:req.params.mygalleryId})
                   .then(Mygallery => {
                       if(Mygallery){
                           res.status(200).json(Mygallery);
                       } else {
                           res.status(404).json({message: "No user found"});
                       }
                   })
                   .catch(error => {
                       return next(error);
                   });
           });   

    router.post('/Galleries', function(req, res, next){
        logger.log('Create a photo', 'verbose');

       var mygallery = new Mygallery(req.body);
       mygallery.save()
       .then(result => {
           res.status(201).json(result);
       })
       .catch( err => {
          return next(err);
       });
     });
  
    router.put('/Galleries/:mygalleryId', /*requireAuth,*/ function (req, res, next){
        logger.log('Update photos with id mygalleryid'+ req.params.mygalleryId, 'verbose');

        Mygallery.findOneAndUpdate({_id: req.params.mygalleryId},       
           req.body, {new:true, multi:false})
               .then(Mygallery => {
                   res.status(200).json(Mygallery);
               })
               .catch(error => {
                   return next(error);
               });
       });  

    router.delete('/Galleries/:mygalleryId', /*requireAuth,*/  function (req, res, next){
        logger.log('Delete gallery with id mygalleryid'+ req.params.mygalleryId, 'verbose');

        Mygallery.remove({ _id: req.params.mygalleryId })
               .then(Mygallery => {
                   res.status(200).json({msg: "Gallery Deleted"});
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

 router.post('/Galleries/upload/:userId/:mygalleryId', upload.any(), function(req, res, next){
    logger.log('Upload file for my gallery ' + req.params.mygalleryId + ' and ' + req.params.userId, 'verbose');
    
    Mygallery.findById(req.params.mygalleryId, function(err, mygallery){
       if(err){ 
           return next(err);
         } else {     
             if(req.files){
                 mygallery.file = {
                     fileName : req.files[0].filename,
                     originalName : req.files[0].originalname,
                     dateUploaded : new Date()
                 };
             }           
             mygallery.save()
                 .then(mygallery => {
                     res.status(200).json(mygallery);
                })
                 .catch(error => {
                     return next(error);
                 });
         }
    });
});
 
};
