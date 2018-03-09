var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User_Schema = new Schema({
	user_name: {type: String},
	email: {type:String},
	deparment: {type:String},
	password:{type:String}

});

module.exports.users = mongoose.model('users', User_Schema);