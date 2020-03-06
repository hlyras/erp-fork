const userController = require('./user');

const Seamstress = require('./../model/seamstress');

const seamstressController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		res.render('seamstress/index', { user: req.user });
	},
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		const seamstress = {
			name: req.body.seamstress_name
		};

		if(seamstress.name.length > 45){
			return res.send({ msg: 'O nome inserido é inválido.' });
		};

		Seamstress.save(seamstress)
			.then(row => {
				res.send({ done: 'Nova costureira cadastrada com sucesso!', seamstress: row });
			})
			.catch(err => {
				console.log(err);
			});
	},
	list: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		const seamstresses = await Seamstress.list();
		res.send(seamstresses);
	},
	filter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		if(isNaN(req.query.code) || req.query.code < 0 || req.query.code > 9999){
			req.query.code = "";
		};

		if(req.query.name){
			Seamstress.findByName(req.query.name)
				.then(seamstresses => {
					res.send(seamstresses);
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			Seamstress.list()
				.then(seamstresses => {
					res.send(seamstresses);
				})
				.catch(err => {
					console.log(err);
				});
		};
	},
	findById: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		Seamstress.findById(req.params.id)
			.then(async (seamstress) => {
				res.send(seamstress);
			})
			.catch(err => {
				return console.log(err);
			});
	},
	remove: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		Seamstress.remove(req.params.id)
			.then(async (seamstress) => {
				console.log(seamstress);
				res.send(seamstress);
			})
			.catch(err => {
				return console.log(err);
			});
	} 

};

module.exports = seamstressController;