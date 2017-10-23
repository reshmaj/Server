var express = require('express'),
router = express.Router(),
logger = require('../../config/logger');

var mongoose = require('mongoose');
var Todo = mongoose.model('todos');
    

module.exports = function (app, config) {
    app.use('/api', router);
    
    router.get('/todos/user/:userId', function (req, res, next){
        logger.log('Get ToDos for a user', 'verbose');

       var query = Todo.find({UserId:req.params.todoId})
       .sort(req.query.order)
       .exec()
       .then(result => {
      	if(result && result.length) {
			res.status(200).json(result);
		} else {
			res.status(404).json({message: "No ToDos"});
		}
       })
       .catch(err => {
         return next(err);
       });
   });

    router.get('/todos/:todoId', function (req, res, next){
        logger.log('Get user'+ req.params.todoId, 'verbose');

        Todo.findById(req.params.todoId)
                   .then(Todo => {
                       if(Todo){
                           res.status(200).json(Todo);
                       } else {
                           res.status(404).json({message: "No user found"});
                       }
                   })
                   .catch(error => {
                       return next(error);
                   });
           });    ;;

    router.post('/todos', function(req, res, next){
        logger.log('Create a ToDo', 'verbose');

       var todo = new Todo(req.body);
       todo.save()
       .then(result => {
           res.status(201).json(result);
       })
       .catch( err => {
          return next(err);
       });
     });
  
    router.put('/todos/:todoId', function (req, res, next){
        logger.log('Update Todo with id ToDoid'+ req.params.todoId, 'verbose');

        Todo.findOneAndUpdate({_id: req.params.todoId}, 		
           req.body, {new:true, multi:false})
               .then(Todo => {
                   res.status(200).json(Todo);
               })
               .catch(error => {
                   return next(error);
               });
       });  

    router.delete('/todos/:todoId', function (req, res, next){
        logger.log('Delete ToDo with id ToDoid'+ req.params.todoId, 'verbose');

        Todo.remove({ _id: req.params.todoId })
               .then(Todo => {
                   res.status(200).json({msg: "ToDo Deleted"});
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
  
};
