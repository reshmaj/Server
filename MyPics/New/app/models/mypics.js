var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var myPicsSchema = new Schema({
    userId:{type: Schema.Types.ObjectId, required:true },
    myPics:{type: String, required:true },
    dateCreated:{type: Date, default: Date.now },
    file:{
        fileName: {type: String},
        originalName: {type: String},
        dateUploaded: {type: Date, default: Date.now}
    },
});

module.exports = Mongoose.model('Mypics', myPicsSchema);

