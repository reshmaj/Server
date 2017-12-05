var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var myPicsSchema = new Schema({
    userId:{type: Schema.Types.ObjectId, required:true },
    mypic:{type: String, required:true},
    description: {type: String},
    dateCreated:{type: Date, default: Date.now },
});

module.exports = Mongoose.model('Mypics', myPicsSchema);
