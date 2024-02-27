const User = require('../../model/user');
const userController = require('./../user/main');

const lib = require("jarmlib");

const Sale = require('../../model/ecommerce/sale');

const Product = require('../../model/product/main');
Product.color = require('../../model/product/color');

const saleController = {};

saleController.save = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-ass', 'fin-ass', 'adm-aud'])) {
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	let sale = req.body.sale;
	sale.date = new Date().getTime();
	sale.obs = req.body.sale.obs;
	sale.products = JSON.parse(req.body.sale.products);
	sale.product_actions = { add: [], update: [], remove: [] };
	sale.packages = JSON.parse(req.body.sale.packages);
	sale.package_actions = { add: [], update: [], remove: [] };
	sale.package_product_actions = { add: [], update: [], remove: [] };
	sale.user_id = req.user.id;
	sale.user_name = req.user.name;

	if (!sale.origin) { return res.send({ msg: "É necessário informar a origem da venda" }); };
	if (!sale.code) { return res.send({ msg: "É necessário informar o código da venda" }); };
	if (!sale.datetime) { return res.send({ msg: "É necessário informar o horário da venda" }); };
	if (!sale.customer_user) { return res.send({ msg: "É necessário informar o usuário do cliente" }); };
	if (!sale.customer_name) { return res.send({ msg: "É necessário informar o nome do cliente" }); };
	if (!sale.tracker) { return res.send({ msg: "É necessário informar o código de rastreio da venda" }); };
	if (!sale.status) { return res.send({ msg: "É necessário informar o status da venda" }); };
	if (!sale.products.length && !sale.packages.length) { return res.send({ msg: "É necessário incluir ao menos um produto ou pacote." }); };

	try {
		if (!sale.id) {
			let verifyCode = await Sale.findByCode(sale.code);
			if (verifyCode.length) { return res.send({ msg: "Este código já está sendo utilizado." }); };

			let row = await Sale.save(sale);
			sale.id = row.insertId;

			for (i in sale.products) {
				sale.products[i].info = sale.products[i].code + " | " + sale.products[i].name + " | " + sale.products[i].color + " | " + sale.products[i].size;
				await Sale.product.add(sale.id, sale.products[i]);
			};

			for (i in sale.packages) {
				sale.packages[i].info = sale.packages[i].code + " | " + sale.packages[i].name + " | " + sale.packages[i].color;
				sale.packages[i].package_id = sale.packages[i].id;
				await Sale.package.add(sale.id, sale.packages[i]);
				for (j in sale.packages[i].products) {
					await Sale.package.product.add(sale.id, sale.packages[i].id, sale.packages[i].products[j]);
				};
			};

			res.send({ done: "Venda cadastrada com sucesso!", sale: sale });
		} else {
			let verifyCode = await Sale.findByCode(sale.code);
			if (verifyCode.length) {
				if (verifyCode[0].id != sale.id) {
					return res.send({ msg: 'Este código de produto já está cadastrado.' });
				};
			};

			await Sale.update(sale);

			// // // // // // // // 
			// sale product updates
			// // // // // // // // 
			let db_sale_products = await Sale.product.list(sale.id);
			if (!db_sale_products.length && sale.products.length) {
				for (i in sale.products) {
					sale.products[i].info = sale.products[i].code + " | " + sale.products[i].name + " | " + sale.products[i].color + " | " + sale.products[i].size;
					await Sale.product.add(sale.id, sale.products[i]);
				};
			} else if (db_sale_products.length && !sale.products.length) {
				await Sale.product.removeAll(sale.id);
			} else if (db_sale_products.length && sale.products.length) {
				sale.products = db_sale_products.reduce((products, product) => {
					for (i in products) { if (products[i].product_id == product.product_id) { return products; }; };
					sale.product_actions.remove.push(product);
					return products;
				}, sale.products);

				db_sale_products = sale.products.reduce((products, product) => {
					for (i in products) { if (products[i].product_id == product.product_id) { sale.product_actions.update.push(product); return products; }; };
					sale.product_actions.add.push(product);
					return products;
				}, db_sale_products);

				for (let i in sale.product_actions.add) {
					sale.product_actions.add[i].info = "" + sale.product_actions.add[i].code + " | " + sale.product_actions.add[i].name + " | " + sale.product_actions.add[i].color + " | " + sale.product_actions.add[i].size;
					await Sale.product.add(sale.id, sale.product_actions.add[i]);
				};
				for (let i in sale.product_actions.update) { await Sale.product.update(sale.product_actions.update[i].id, sale.product_actions.update[i]); };
				for (let i in sale.product_actions.remove) { await Sale.product.remove(sale.product_actions.remove[i].id); };
			};

			// // // // // // // // 
			// sale package updates
			// // // // // // // // 
			let db_sale_packages = await Sale.package.list(sale.id);
			if (!db_sale_packages.length && sale.packages.length) {
				for (i in sale.packages) {

					sale.packages[i].info = sale.packages[i].code + " | " + sale.packages[i].name + " | " + sale.packages[i].color;
					sale.packages[i].package_id = sale.packages[i].id;

					await Sale.package.add(sale.id, sale.packages[i]);
				};
			} else if (db_sale_packages.length && !sale.packages.length) {
				await Sale.package.removeAll(sale.id);
				await Sale.package.product.clear(sale.id);
			} else if (db_sale_packages.length && sale.packages.length) {
				sale.packages = db_sale_packages.reduce((packages, package) => {
					for (i in packages) { if (packages[i].id == package.id) { return packages; }; };
					sale.package_actions.remove.push(package);
					return packages;
				}, sale.packages);

				db_sale_packages = sale.packages.reduce((packages, package) => {
					for (i in packages) { if (packages[i].id == package.id) { sale.package_actions.update.push(package); return packages; }; };
					sale.package_actions.add.push(package);
					return packages;
				}, db_sale_packages);

				for (let i in sale.package_actions.add) {
					sale.package_actions.add[i].info = "" + sale.package_actions.add[i].code + " | " + sale.package_actions.add[i].name + " | " + sale.package_actions.add[i].color;
					sale.package_actions.add[i].id = sale.package_actions.add[i].package_id;

					await Sale.package.add(sale.id, sale.package_actions.add[i]);
				};
				for (let i in sale.package_actions.update) {
					sale.package_actions.update[i].info = "" + sale.package_actions.update[i].code + " | " + sale.package_actions.update[i].name + " | " + sale.package_actions.update[i].color;
					await Sale.package.update(sale.package_actions.update[i].id, sale.package_actions.update[i]);
				};
				for (let i in sale.package_actions.remove) { await Sale.package.remove(sale.package_actions.remove[i].id); await Sale.package.product.removeAll(sale.id, sale.package_actions.remove[i].package_id); };
			};

			// sale package products updates
			for (let i in sale.packages) {
				let db_sale_package_products = await Sale.package.product.list(sale.id, sale.packages[i].package_id);

				if (!db_sale_package_products.length && sale.packages[i].products.length) {
					for (j in sale.packages[i].products) {
						await Sale.package.product.add(sale.id, sale.packages[i].package_id, sale.packages[i].products[j]);
					};
				} else if (db_sale_package_products.length && !sale.packages[i].products.length) {
					await Sale.package.product.removeAll(sale.id, sale.packages[i].package_id);
				} else if (db_sale_package_products.length && sale.packages[i].products.length) {
					sale.packages[i].products = db_sale_package_products.reduce((products, product) => {
						for (let j in products) { if (products[j].id == product.id) { return products; }; };
						sale.package_product_actions.remove.push(product);
						return products;
					}, sale.packages[i].products);

					db_sale_package_products = sale.packages[i].products.reduce((products, product) => {
						for (let j in products) { if (products[j].id == product.id) { sale.package_product_actions.update.push(product); return products; }; };
						sale.package_product_actions.add.push(product);
						return products;
					}, db_sale_package_products);

					for (let j in sale.package_product_actions.add) {
						await Sale.package.product.add(sale.id, sale.packages[i].id, sale.package_product_actions.add[j]);
					};
					for (let i in sale.package_product_actions.update) { await Sale.package.product.update(sale.package_product_actions.update[i].id, sale.package_product_actions.update[i]); };
					for (let i in sale.package_product_actions.remove) { await Sale.package.product.remove(sale.package_product_actions.remove[i].id); };
					sale.package_product_actions = { add: [], update: [], remove: [] };
				};
			};

			res.send({ done: "Venda atualizada com sucesso!", sale: sale });
		};

	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar sua venda, favor contatar o suporte." });
	};
};

saleController.update = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-ass', 'adm-aud', 'pro-man', 'fin-ass', 'log-pac', 'pro-sto'])) {
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	let sale = req.body.sale;

	try {
		if (sale.id && sale.status) {
			sale.datetime = lib.date.timestamp.generate();
			sale.user_id = req.user.id;
			sale.user_name = req.user.name;
			await Sale.updateStatus(sale);
			res.send({ done: "Venda atualizada com sucesso!", sale: sale });
		} else {
			res.send({ msg: "Não foi possível atualizar o pedido, reinicie a página e tente novamente, caso o problema persista favor contatar o suporte!", sale: sale });
		};
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar a venda, favor contatar o suporte." });
	};
};

saleController.changeStatus = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man'])) {
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	let sale = req.body.sale;
	sale.user_id = req.user.id;
	sale.user_name = req.user.name;

	try {
		if (sale.id && sale.status) {
			await Sale.changeStatus(sale);
			res.send({ done: "Venda atualizada com sucesso!", sale: sale });
		} else {
			res.send({ msg: "Não foi possível atualizar o pedido, reinicie a página e tente novamente, caso o problema persista favor contatar o suporte!", sale: sale });
		};
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar a venda, favor contatar o suporte." });
	};
};

saleController.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-ass', 'fin-ass', 'adm-aud', 'pro-man', 'log-pac', 'pro-ass', 'com-ass', 'pro-sto'])) {
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	let props = [];
	let inners = [];

	let period = { key: "datetime", start: req.body.sale.periodStart, end: req.body.sale.periodEnd };
	let params = { keys: [], values: [] }
	let strict_params = { keys: [], values: [] }

	lib.Query.fillParam("origin", req.body.sale.origin, params);
	lib.Query.fillParam("code", req.body.sale.code, params);
	lib.Query.fillParam("customer_name", req.body.sale.customer_name, params);
	lib.Query.fillParam("customer_user", req.body.sale.customer_user, params);
	lib.Query.fillParam("tracker", req.body.sale.tracker, params);
	lib.Query.fillParam("status", req.body.sale.status, strict_params);

	let order_params = [["datetime", "ASC"]];
	let limit = 0;

	try {
		let sales = await Sale.filter({ props, inners, period, params, strict_params, order_params, limit });
		res.send({ sales });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
	};
};

saleController.findById = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-ass', 'fin-ass', 'adm-aud', 'pro-man', 'log-pac', 'pro-ass', 'com-ass', 'pro-sto'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		const sale = await Sale.findById(req.params.id);
		sale[0].products = await Sale.product.list(req.params.id);
		sale[0].packages = await Sale.package.list(req.params.id);
		for (let i in sale[0].packages) {
			sale[0].packages[i].products = [];
			let package_products = await Sale.package.product.list(req.params.id, sale[0].packages[i].package_id);
			for (let j in package_products) {
				sale[0].packages[i].products.push(package_products[j]);
			};
		};

		res.send({ sale });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar a venda, favor contatar o suporte." });
	};
};

saleController.findByTracker = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-ass', 'fin-ass', 'adm-aud', 'pro-man', 'log-pac', 'pro-ass', 'com-ass', 'pro-sto'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		const sale = await Sale.findByTracker(req.params.tracker);
		if (!sale.length) { return res.send({ sale: [] }); }
		sale[0].products = await Sale.product.list(sale[0].id);
		sale[0].packages = await Sale.package.list(sale[0].id);
		for (let i in sale[0].packages) {
			sale[0].packages[i].products = [];
			let package_products = await Sale.package.product.list(sale[0].id, sale[0].packages[i].package_id);
			for (let j in package_products) {
				sale[0].packages[i].products.push(package_products[j]);
			};
		};

		res.send({ sale });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar a venda, favor contatar o suporte." });
	};
};

module.exports = saleController;