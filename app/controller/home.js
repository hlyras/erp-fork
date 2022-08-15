const User = require('../model/user');
const userController = require('./user');

const Product = require('../model/product/main');
Product.color = require('../model/product/color');

const homeController = {
	index: async (req, res) => {
		if(req.user){
			const productColors = await Product.color.list();
			return res.render('home', { user: req.user, productColors: productColors });
		};
		res.render('login', { message: req.flash('loginMessage') });
	},
	login: (req, res) => {
		if(req.user){
			return res.redirect("/");
		};
		res.render('login', { message: req.flash('loginMessage')});
	},
	successfulLogin: (req, res) => {
		res.redirect('/');
	},
	signup: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		res.render('user/signup', { user: req.user, message: req.flash('signupMessage')});
	},
	successfulSignup: (req, res) => {
		res.redirect('/');
	},
	logout: (req, res) => {
		req.logout(function(err) {
	    // if (err) { return next(err); }
	    console.log(err);
	    res.redirect('/');
	  });
	}
};

module.exports = homeController;