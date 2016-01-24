var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    
    username: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    creationDate: {type: Date, default: Date.now},
    admin: {type: Boolean, default: false}
    
});

UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);