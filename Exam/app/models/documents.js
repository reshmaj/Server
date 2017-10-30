var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

// Document Schema 
var myDocumentSchema = new Schema({
    property1:{type:String, required:true},
    property2:{type:Number, required:true}
});

//Creates and exports the model
module.exports = Mongoose.model('Docs', myDocumentSchema);
