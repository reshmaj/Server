var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var myTodoSchema = new Schema({
userId:{type: Schema.Types.ObjectId, required:true },
todo:{type: String, required:true },
description:{type: String, required:true, unique:true },
dateCreated:{type: Date, default: Date.now },
datedue:{type: Date, default: Date.now},
completed: {type:Boolean, default: false},
file:{fileName: String, originalName: String}
});

module.exports = Mongoose.model('todos', myTodoSchema);