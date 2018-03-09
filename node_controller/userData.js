var express = require('express');
var jwt = require('jsonwebtoken');
var user_model = require('../models/user_schema');

var User_Api =  {
	
	get_User_Data : function(req,res) {
		
		user_model.users.find({},function(err,data){
			if(err){
				console.log(err);
			}else{
				res.json(data);
			}
		});
	},

	create_Users : function(req,res) {
		console.log('inpost',req.body);
		user_model.users.create({user_name:req.body.name, email:req.body.email,
								 deparment:req.body.deparment, password: req.body.pswd}, function(err, users_data){
			if(err){
				console.log(err);
			} else{
				res.json(users_data);
			}
		});
	},

	update_Users : function(req,res) {
		console.log('id',req.params.id);
		console.log('all data',req.body.name);
		
		user_model.users.update({_id:req.params.id},{$set:{user_name:req.body.name}}, 
		function(err, users_data){
			if(err){
				console.log(err);
			} else{
				res.json(users_data);
				}
		});
	},

	delete_Users : function(req,res) {
		console.log('id',req.params.id);
        user_model.users.remove({_id:req.params.id},function(err, delete_users_data){
			if(err){
				console.log(err);
			} else{
				res.json(delete_users_data);
			}
		});
	},

	check_token : function(req, res){
		console.log('is it hitting...',req.token);
		jwt.verify(req.token, 'secretkey', function(err,authData){
			if(err) {
				res.sendStatus(403);
			} else{
				res.json({
					message:'this is api res',
					authData
				});
			}
		});
		
	},

	user_login : function(req,res) {
		// mock user
		const user = {
			id:1,
			username:"vijaya",
			email:"vijju@gmail.com"
		}
		jwt.sign({user: user},'secretkey',(err, token) => {
			res.json({token: token});
		});
	},
	//verify token
	verifyToken : function(req,res,next){
		console.log('coming here also',req.headers);
		const bearerHeader = req.headers['authorization'];
		console.log('coming here also',req.headers);

		if(bearerHeader !== undefined) {
			console.log('in if');
			const bearer = bearerHeader.split(' ');
			console.log('bearer',bearer);
			const bearerToken = bearer[1];
			console.log('bearToken',bearerToken);
			req.token = bearerToken;
			// it is calling next function check_token
			next();

		} else {
			res.sendStatus(403);
		}
	}

}


module.exports = User_Api;