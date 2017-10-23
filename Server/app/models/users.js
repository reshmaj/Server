var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var UserSchema = new Schema({
 firstName:{type: String, required:true },
 lastName:{type: String, required:true },
 email:{type: String, required:true, unique:true },
 password:{type: String, required:true },
 dateregistered:{type: Date, default: Date.now},
 Status: {type:Boolean, default: true}
});

module.exports = Mongoose.model('Users', UserSchema);
