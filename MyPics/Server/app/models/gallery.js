var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var myGallerySchema = new Schema({
    Id:{type: Schema.Types.ObjectId, required:true },
    file:{
        fileName: {type: String},
        originalName: {type: String},
        dateUploaded: {type: Date, default: Date.now}
    },
});

module.exports = Mongoose.model('Galleries', myGallerySchema);
