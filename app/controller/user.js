const User = require('../model/user');

const bcrypt = require('bcrypt-nodejs');

const userController = {
	index: (req, res) => {
		res.render('user/profile', { user: req.user });
	},
	verify: (req, res, next) => {
		if (req.isAuthenticated()){ return next() };
		res.redirect('/login');
	},
	verifyAccess: async (req, res, access) => {
		if(req.isAuthenticated()){
			for(let i in access){
				if(access[i]==req.user.access){
					return true;
				};
			};
		};
		return false;
	},
	list: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['dvp','prp','spt','grf','grl','crd'])){
			return res.send({ unauthorized: "Usuário não autorizado."});
		};
		let users = await User.list();
		res.send({ users: users });
	},
	show: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['dvp','prp','spt','grf','grl','crd'])){
		// 	return res.send({ unauthorized: "Usuário não autorizado."});
		// };

		let user = await User.findById(req.body.user_id);
		res.send({ user });
	},
	updateInfo: async (req, res) => {
		if(!req.isAuthenticated()){
			res.send({ unauthorized: "Não autorizado" });
		};

		const user = {
			id: req.user.id,
			email: req.body.user_email,
			birth: req.body.user_birth
		};

		if(user.email){
			var row = await User.findByEmail(user);
			if(row.length){ return res.send({ msg: "Este e-mail já está cadastrado." })};
		};

		row = await User.updateInfo(user);
		res.send({ done: "Informações atualizadas com sucesso." });
	},
	updatePassword: async (req, res) => {
		if(!req.isAuthenticated()){
			res.send({ unauthorized: "Não autorizado" });
		};

		if(!req.body.user_password){
			return res.send({ msg: 'Os campos devem ser preenchidos' });
		};

		const user = {
			id: req.user.id,
			password: bcrypt.hashSync(req.body.user_password, null, null) 
		};

		let row = await User.updatePassword(user);
		res.send({ done: "Senha alterada com sucesso." });
	}
};

module.exports = userController;