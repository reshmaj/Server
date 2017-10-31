//Create the express object
var express = require('express'),

// Creates Router Object
router = express.Router(), 

//Imports the Document model
mongoose = require('mongoose'),
Newdocum = mongoose.model('Docs');

module.exports = function (app, config) {
app.use('/api', router);

//Gets all the Documents using GET function
router.get('/Docs', function (req, res, next){
           console.log('Get all the documents', 'verbose');
           var query = Newdocum.find()
           .then(result => {
            if(result && result.length) {
                        res.status(200).json(result);
                } else {
                        res.status(404).json({message: "No documents"});
    }
   })
        .catch(err => {
        return next(err);
   });
});

//Creates a new Document object from the data sent in the request using the Document model
router.post('/Docs', function(req, res, next){
            console.log('Create a document', 'verbose');
            var newdocum = new Newdocum(req.body);
            newdocum.save()
            .then(result => {
            res.status(201).json(result);
  })
      .catch( err => {
      return next(err);
   });
 });
};
