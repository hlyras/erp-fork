const User = require('../model/user');
const userController = require('./user');

const Feedstock = require('../model/feedstock');

const feedstockController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		
		const feedstockColors = await Feedstock.colorList();
		res.render('feedstock/index', { feedstockColors: feedstockColors, user: req.user });
	},
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		const feedstock = {
			id: parseInt(req.body.id),
			code: parseInt(req.body.feedstock_code),
			name: req.body.name,
			color: req.body.color,
			standard: req.body.standard,
			uom: req.body.uom
		};

		if(!feedstock.code || feedstock.code < 1 || feedstock.code > 9999){return res.send({ msg: 'Código de produto inválido.' })};
		if(!feedstock.name || feedstock.name.length > 20){return res.send({ msg: 'Preencha o nome do produto.' })};
		if(!feedstock.color || feedstock.color.length > 10){return res.send({ msg: 'Preencha a cor do produto.' })};
		if(!feedstock.standard || feedstock.standard.length > 5){return res.send({ msg: 'Preencha a medida padrão.' })};
		if(!feedstock.uom || feedstock.uom.length > 2){return res.send({ msg: 'Preencha a unidade de medida.' })};

		if(!feedstock.id){
			var row = await Feedstock.findByCode(feedstock.code);
			if(row.length){return res.send({ msg: 'Este código de produto já está cadastrado.' })};
			
			var row = await Feedstock.save(feedstock);
		} else {
			var row = await Feedstock.findByCode(feedstock.code);
			if(row.length){
				if(row[0].id != feedstock.id){
					return res.send({ msg: 'Este código de produto já está cadastrado.' });
				};
			};
			
			var row = await Feedstock.update(feedstock);
		};

		try {
			var storages = await Feedstock.listStorages();

			for(i in storages){
				var insert = {
					storage_id: storages[i].id,
					feedstock_id: feedstock.id,
					amount: 0
				};

				await Feedstock.insertInStorage(insert);
			};
		} catch (err) {
			console.log(err);
			return res.send({ msg: 'Ocorreu um erro ao registrar a matéria-prima ao estoque, favor contatar o suporte.' });
		};

		// let newFeedstock = await Feedstock.findById(row.insertId);

		res.send({ done: 'Produto cadastrado com sucesso!' });
	},
	findById: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 's/a'])){
		// 	return res.redirect('/');
		// };

		Feedstock.findById(req.params.id)
			.then(async (feedstock) => {
				res.send(feedstock);
			})
			.catch(err => {
				return console.log(err);
			});
	},
	filter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		let params = [];
		let values = [];

		if(req.query.name){
			Feedstock.findByName(req.query.name)
				.then(feedstocks => {
					res.send(feedstocks);
				})
				.catch(err => {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao filtrar as matérias primas, favor contatar o suporte" });
				});
		} else {
			if(parseInt(req.query.code)){
				params.push("code");
				values.push(req.query.code);
			};

			if(req.query.color){
				params.push("color");
				values.push(req.query.color);
			};

			Feedstock.filter(params, values)
				.then(feedstocks => {
					res.send(feedstocks);
				})
				.catch(err => {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao filtrar as matérias primas, favor contatar o suporte" });
				});
		};
	},
	remove: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		await Feedstock.remove(req.query.id);
		
		res.send({ done: 'Matéria Prima excluída com sucesso!' });
	},
	storage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		const feedstockColors = await Feedstock.colorList();
		res.render('feedstock/storage', { feedstockColors: feedstockColors, user: req.user });
	},
	createStorage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		if(req.body.name.length < 3 || req.body.name.length > 20){return res.send({ msg: 'Nome de Estoque inválido!' })};

		try {
			var result = await Feedstock.createStorage(req.body.name);	
		} catch (err){
			console.log(err);
			return res.send({ msg: 'Ocorreu um erro ao criar este banco de dados favor entrar em contato com o suporte.' });
		};

		try {
			const feedstocks = await Feedstock.list();

			for(i in feedstocks){
				var insert = {
					storage_id: result.insertId,
					feedstock_id: feedstocks[i].id,
					amount: 0
				};

				await Feedstock.insertInStorage(insert);
			};
		} catch (err){
			console.log(err);
			return res.send({ msg: 'Ocorreu um erro ao registrar uma matéria-prima ao estoque, favor contatar o suporte.' });
		};

		res.send({ done: 'Estoque criado e produtos cadastrados com sucesso!' });
	}
};

module.exports = feedstockController;