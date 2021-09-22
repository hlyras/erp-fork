const Product = require('../../model/product/main');
Product.feedstock = require('../../model/product/feedstock');

const Feedstock = require('../../model/feedstock');

const productController = require('./main');

productController.feedstock = {
	add: async(req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const product_feedstock = {
			id: req.body.id,
			product_id: req.body.product_id,
			feedstock_id: req.body.feedstock_id,
			uom: req.body.uom,
			amount: parseInt(req.body.amount),
			measure: parseFloat(req.body.measure),
			category_id: req.body.category_id
		};

		if(!product_feedstock.product_id){
			return res.send({ msg: "Não é possível cadastrar sem informar o produto!" })
		};

		if(!product_feedstock.feedstock_id){
			return res.send({ msg: "Selecione a Matéria-Prima" });
		};

		if(!product_feedstock.uom){
			return res.send({ msg: "Selecione a Unidade de medida" });
		};

		if(product_feedstock.uom == "cm"){
			if(!product_feedstock.amount){
				return res.send({ msg: "Informe a quantidade" });
			};
			if(!product_feedstock.measure){
				return res.send({ msg: "Informe a medida" });
			};
		};

		if(product_feedstock.uom == "un"){
			product_feedstock.measure = 0;
			if(!product_feedstock.amount){
				return res.send({ msg: "Informe a quantidade" });
			};
		};

		try {
			if(!product_feedstock.id || product_feedstock.id < 1) {
				await Product.feedstock.add(product_feedstock);
				res.send({ done: "Matéria-Prima adicionada com sucesso." });
			} else {
				await Product.feedstock.update(product_feedstock);
				res.send({ done: "Matéria-Prima atualizada com sucesso." });
			};
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao cadastrar a matéria-prima, favor contatar o suporte." });
		};
	},
	findById: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','COR-GER'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			let product_feedstock = await Product.feedstock.findById(req.params.id);
			res.send({ product_feedstock });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao encontrar a matéria-prima do produto, favor contatar o suporte." });
		};
	},
	list: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','COR-GER'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			let product = { feedstocks: [] };
			let feedstocks = [];
			product.feedstocks = await Product.feedstock.list(req.params.product_id);

			for(i in product.feedstocks){
				let feedstock = await Feedstock.findById(product.feedstocks[i].feedstock_id);
				feedstocks.push(feedstock[0]);
			};

			for(i in product.feedstocks){
				for(j in feedstocks){
					if(product.feedstocks[i].feedstock_id == feedstocks[j].id){
						product.feedstocks[i].code = feedstocks[j].code;
						product.feedstocks[i].name = feedstocks[j].name;
						product.feedstocks[i].color = feedstocks[j].color;
						product.feedstocks[i].uom = feedstocks[j].uom;
					};
				};
			};

			res.send({ feedstocks: product.feedstocks });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao listar as matérias-primas do produto, favor contatar o suporte." });
		};
	},
	remove: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			await Product.feedstock.remove(req.query.id);
			res.send({ done: 'Matéria-prima excluída!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao remover a matéria-prima." });
		};
	},
	category: {
		save: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			const category = {
				id: req.body.id,
				product_id: req.body.product_id,
				name: req.body.category_name
			};

			if(!category.product_id){
				return res.send({ msg: "Produto inválido!" });
			};

			if(!category.name || category.name.length < 3){
				return res.send({ msg: "O nome da categoria é inválido!" });
			};

			try {
				if(!category.id){
					await Product.feedstock.category.save(category);
				} else {
					await Product.feedstock.category.update(category);
				};
				res.send({ done: "Categoria cadastrada com sucesso!" });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao cadastrar a categoria da matéria-prima." });
			};
		},
		list: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				let product_feedstock_categories = await Product.feedstock.category.list(req.params.product_id);
				res.send({ product_feedstock_categories });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao remover a matéria-prima." });
			};
		},
		delete: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				await Product.feedstock.remove(req.query.id);
				res.send({ done: 'Matéria-prima excluída!' });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao remover a matéria-prima." });
			};
		},
		add: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				await Product.feedstock.remove(req.query.id);
				res.send({ done: 'Matéria-prima excluída!' });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao remover a matéria-prima." });
			};
		},
		remove: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				await Product.feedstock.remove(req.query.id);
				res.send({ done: 'Matéria-prima excluída!' });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao remover a matéria-prima." });
			};
		}
	}
};

module.exports = productController.feedstock;