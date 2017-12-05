var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
priorities = ['Low', 'Medium', 'High', 'Critical'];

var myTodoSchema = new Schema({
userId:{type: Schema.Types.ObjectId, required:true },
todo:{type: String, required:true },
description:{type: String, required:true, unique:true },
priority:{type: String, enum:priorities},
dateCreated:{type: Date, default: Date.now },
datedue:{type: Date, default: Date.now},
completed: {type:Boolean, default: false},
file:{
    fileName: {type: String},
    originalName: {type: String},
    dateUploaded: {type: Date, default: Date.now}
},
});

module.exports = Mongoose.model('todos', myTodoSchema);