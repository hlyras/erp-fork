const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Sale = require('../../model/ecommerce/sale');

const Product = require('../../model/product/main');
Product.color = require('../../model/product/color');

const saleController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud','COR-GER'])){
			return res.redirect('/');
		};

		try {
			res.render('ecommerce/sale/index', { user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	},
	gathering: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud'])){
			return res.redirect('/');
		};

		try {
			res.render('ecommerce/sale/gathering', { user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	},
	triage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','pro-man','log-pac','COR-GER'])){
			return res.redirect('/');
		};

		try {
			res.render('ecommerce/sale/triage', { user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	},
	manage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-aud'])){
			return res.redirect('/');
		};

		try {
			res.render('ecommerce/sale/manage', { user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	},
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		let sale = req.body.sale;
		sale.date = new Date().getTime();
		sale.obs = req.body.sale.obs;
		sale.products = JSON.parse(req.body.sale.products);
		sale.product_actions = { add: [], update: [], remove: [] } ;
		sale.packages = JSON.parse(req.body.sale.packages);
		sale.package_actions = { add: [], update: [], remove: [] } ;
		sale.package_product_actions = { add: [], update: [], remove: [] } ;
		sale.user_id = req.user.id;
		sale.user_name = req.user.name;

		if(!sale.origin){ return res.send({ msg: "É necessário informar a origem da venda" }); };
		if(!sale.code){ return res.send({ msg: "É necessário informar o código da venda" }); };
		if(!sale.datetime){ return res.send({ msg: "É necessário informar o horário da venda" }); };
		if(!sale.customer_user){ return res.send({ msg: "É necessário informar o usuário do cliente" }); };
		if(!sale.customer_name){ return res.send({ msg: "É necessário informar o nome do cliente" }); };
		if(!sale.tracker){ return res.send({ msg: "É necessário informar o código de rastreio da venda" }); };
		if(!sale.status){ return res.send({ msg: "É necessário informar o status da venda" }); };
		if(!sale.products.length && !sale.packages.length){ return res.send({ msg: "É necessário incluir ao menos um produto ou pacote." }); };
		
		try {
			if(!sale.id){
				let verifyCode = await Sale.findByCode(sale.code);
				if(verifyCode.length){ return res.send({ msg: "Este código já está sendo utilizado." }); };

				let row = await Sale.save(sale);
				sale.id = row.insertId;

				for(i in sale.products){
					sale.products[i].info = sale.products[i].code+" | "+sale.products[i].name+" | "+sale.products[i].color+" | "+sale.products[i].size;
					await Sale.product.add(sale.id, sale.products[i]);
				};

				for(i in sale.packages){
					sale.packages[i].info = sale.packages[i].code+" | "+sale.packages[i].name+" | "+sale.packages[i].color;
					sale.packages[i].package_id = sale.packages[i].id;
					await Sale.package.add(sale.id, sale.packages[i]);
					for(j in sale.packages[i].products){
						await Sale.package.product.add(sale.id, sale.packages[i].id, sale.packages[i].products[j]);
					};
				};
				
				res.send({ done: "Venda cadastrada com sucesso!", sale: sale });
			} else {
				let verifyCode = await Sale.findByCode(sale.code);
				if(verifyCode.length){
					if(verifyCode[0].id != sale.id){
						return res.send({ msg: 'Este código de produto já está cadastrado.' });
					};
				};

				await Sale.update(sale);

				// // // // // // // // 
				// sale product updates
				// // // // // // // // 
				let db_sale_products = await Sale.product.list(sale.id);
				if(!db_sale_products.length && sale.products.length){
					for(i in sale.products){
						sale.products[i].info = sale.products[i].code+" | "+sale.products[i].name+" | "+sale.products[i].color+" | "+sale.products[i].size;
						await Sale.product.add(sale.id, sale.products[i]);
					};
				} else if(db_sale_products.length && !sale.products.length){
					await Sale.product.removeAll(sale.id);
				} else if(db_sale_products.length && sale.products.length){
					sale.products = db_sale_products.reduce((products, product) => {
						for(i in products){ if(products[i].product_id == product.product_id){ return products; }; };
						sale.product_actions.remove.push(product);
						return products;
					}, sale.products);

					db_sale_products = sale.products.reduce((products, product) => {
						for(i in products){ if(products[i].product_id == product.product_id){ sale.product_actions.update.push(product); return products; }; };
						sale.product_actions.add.push(product);
						return products;
					}, db_sale_products);

					for(let i in sale.product_actions.add){
						sale.product_actions.add[i].info = ""+sale.product_actions.add[i].code+" | "+sale.product_actions.add[i].name+" | "+sale.product_actions.add[i].color+" | "+sale.product_actions.add[i].size;
						await Sale.product.add(sale.id, sale.product_actions.add[i]);
					};
					for(let i in sale.product_actions.update){ await Sale.product.update(sale.product_actions.update[i].id, sale.product_actions.update[i]); };
					for(let i in sale.product_actions.remove){ await Sale.product.remove(sale.product_actions.remove[i].id); };
				};

				// // // // // // // // 
				// sale package updates
				// // // // // // // // 
				let db_sale_packages = await Sale.package.list(sale.id);
				if(!db_sale_packages.length && sale.packages.length){
					for(i in sale.packages){

						sale.packages[i].info = sale.packages[i].code+" | "+sale.packages[i].name+" | "+sale.packages[i].color;
						sale.packages[i].package_id = sale.packages[i].id;
						
						await Sale.package.add(sale.id, sale.packages[i]);
					};
				} else if(db_sale_packages.length && !sale.packages.length){
					await Sale.package.removeAll(sale.id);
					await Sale.package.product.clear(sale.id);
				} else if(db_sale_packages.length && sale.packages.length){
					sale.packages = db_sale_packages.reduce((packages, package) => {
						for(i in packages){ if(packages[i].id == package.id){ return packages; }; };
						sale.package_actions.remove.push(package);
						return packages;
					}, sale.packages);

					db_sale_packages = sale.packages.reduce((packages, package) => {
						for(i in packages){ if(packages[i].id == package.id){ sale.package_actions.update.push(package); return packages; }; };
						sale.package_actions.add.push(package);
						return packages;
					}, db_sale_packages);

					for(let i in sale.package_actions.add){
						sale.package_actions.add[i].info = ""+sale.package_actions.add[i].code+" | "+sale.package_actions.add[i].name+" | "+sale.package_actions.add[i].color;
						sale.package_actions.add[i].id = sale.package_actions.add[i].package_id;
						
						await Sale.package.add(sale.id, sale.package_actions.add[i]);
					};
					for(let i in sale.package_actions.update){ 
						sale.package_actions.update[i].info = ""+sale.package_actions.update[i].code+" | "+sale.package_actions.update[i].name+" | "+sale.package_actions.update[i].color;
						await Sale.package.update(sale.package_actions.update[i].id, sale.package_actions.update[i]); 
					};
					for(let i in sale.package_actions.remove){ await Sale.package.remove(sale.package_actions.remove[i].id); await Sale.package.product.removeAll(sale.id, sale.package_actions.remove[i].package_id); };
				};

				// sale package products updates
				for(let i in sale.packages){
					let db_sale_package_products = await Sale.package.product.list(sale.id, sale.packages[i].package_id);

					if(!db_sale_package_products.length && sale.packages[i].products.length){
						for(j in sale.packages[i].products){
							await Sale.package.product.add(sale.id, sale.packages[i].package_id, sale.packages[i].products[j]);
						};
					} else if(db_sale_package_products.length && !sale.packages[i].products.length){
						await Sale.package.product.removeAll(sale.id, sale.packages[i].package_id);
					} else if(db_sale_package_products.length && sale.packages[i].products.length){
						sale.packages[i].products = db_sale_package_products.reduce((products, product) => {
							for(let j in products){ if(products[j].id == product.id){ return products; }; };
							sale.package_product_actions.remove.push(product);
							return products;
						}, sale.packages[i].products);

						db_sale_package_products = sale.packages[i].products.reduce((products, product) => {
							for(let j in products){ if(products[j].id == product.id){ sale.package_product_actions.update.push(product); return products; }; };
							sale.package_product_actions.add.push(product);
							return products;
						}, db_sale_package_products);

						for(let j in sale.package_product_actions.add){
							await Sale.package.product.add(sale.id, sale.packages[i].id, sale.package_product_actions.add[j]);
						};
						for(let i in sale.package_product_actions.update){ await Sale.package.product.update(sale.package_product_actions.update[i].id, sale.package_product_actions.update[i]); };
						for(let i in sale.package_product_actions.remove){ await Sale.package.product.remove(sale.package_product_actions.remove[i].id); };
						sale.package_product_actions = { add: [], update: [], remove: [] };
					};
				};

				res.send({ done: "Venda atualizada com sucesso!", sale: sale });
			};

		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao cadastrar sua venda, favor contatar o suporte." });
		};
	},
	update: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud','pro-man','log-pac'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		let sale = req.body.sale;

		try {
			if(sale.id && sale.status){
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
	},
	changeStatus: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','adm-man'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		let sale = req.body.sale;
		sale.user_id = req.user.id;
		sale.user_name = req.user.name;

		try {
			if(sale.id && sale.status){
				await Sale.changeStatus(sale);
				res.send({ done: "Venda atualizada com sucesso!", sale: sale });
			} else {
				res.send({ msg: "Não foi possível atualizar o pedido, reinicie a página e tente novamente, caso o problema persista favor contatar o suporte!", sale: sale });
			};
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao buscar a venda, favor contatar o suporte." });
		};
	},
	filter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud','pro-man','log-pac','COR-GER'])){
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

		let order_params = [ ["datetime","ASC"] ];
		let limit = 0;

		try {
			let sales = await Sale.filter(props, inners, period, params, strict_params, order_params, limit);
			res.send({ sales });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
		};
	},
	findById: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud','pro-man','log-pac','COR-GER'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			const sale = await Sale.findById(req.params.id);
			sale[0].products = await Sale.product.list(req.params.id);
			sale[0].packages = await Sale.package.list(req.params.id);
			for(let i in sale[0].packages){
				sale[0].packages[i].products = [];
				let package_products = await Sale.package.product.list(req.params.id, sale[0].packages[i].package_id);
				for(let j in package_products){
					sale[0].packages[i].products.push(package_products[j]);
				};
			};

			res.send({ sale });
		} catch (err){
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao buscar a venda, favor contatar o suporte." });
		};
	},
	service_order: {
		save: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','adm-man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			let service_order = {
				date: new Date().getTime(),
				datetime: lib.date.datetime.toTimestamp(req.body.service_order.datetime),
				code: req.body.service_order.code,
				sales: req.body.service_order.sales,
				sale_amount: req.body.service_order.sale_amount
			};

			try {
				let row = await Sale.service_order.save(service_order);
				service_order.id = row.insertId;

				for(let i in service_order.sales){
					service_order.sales[i].os = service_order.code;
					service_order.sales[i].status = "Enviado";
					await Sale.service_order.sale.add(service_order.id, service_order.sales[i].id);
					await Sale.service_order.sale.update(service_order.sales[i]);
				};

				res.send({ done: "OS cadastrada com sucesso!", service_order: service_order });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao buscar a venda, favor contatar o suporte." });
			};
		}
	},
	after_sale: {
		index: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud'])){
				return res.redirect('/');
			};

			try {
				res.render('ecommerce/sale/after_sale', { user: req.user });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao realizar requisição." });
			};
		},
		save: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud'])){
				return res.send({ unauthorized: "Você não tem permissão para acessar!" });
			};

			let sale = req.body.sale;
			sale.user_id = req.user.id;
			sale.user_name = req.user.name;

			if(!sale.origin){ return res.send({ msg: "É necessário informar a origem da venda" }); };
			if(!sale.code){ return res.send({ msg: "É necessário informar o código da venda" }); };
			if(!sale.date){ return res.send({ msg: "É necessário informar o horário da venda" }); };
			if(!sale.customer_user){ return res.send({ msg: "É necessário informar o usuário do cliente" }); };
			if(!sale.customer_name){ return res.send({ msg: "É necessário informar o nome do cliente" }); };
			if(!sale.status){ return res.send({ msg: "É necessário informar o status da venda" }); };
			
			try {
				if(!sale.id){
					let verifyDuplicity = await Sale.after_sale.findByCode(sale.code);
					if(verifyDuplicity.length){ return res.send({ msg: "Esta venda já está cadastrada!" })};					

					let row = await Sale.after_sale.save(sale);
					sale.id = row.insertId;

					res.send({ done: "Venda cadastrada com sucesso!", sale: sale });
				} else {
					res.send({ done: "Venda atualizada com sucesso!", sale: sale });
				};

			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao cadastrar sua venda, favor contatar o suporte." });
			};
		},
		filter: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud','pro-man','log-pac','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para acessar!" });
			};

			let params = [];
			let values = [];

			let periodStart = ""; 
			let periodEnd = "";

			if(req.body.sale.periodStart && req.body.sale.periodEnd){
				periodStart = req.body.sale.periodStart;
				periodEnd = req.body.sale.periodEnd;
			} else {
				periodStart = "";
				periodEnd = "";
			};

			if(req.body.sale.code){
				params.push("code");
				values.push(req.body.sale.code);
			};

			if(req.body.sale.customer_name){
				params.push("customer_name");
				values.push(req.body.sale.customer_name);
			};

			if(req.body.sale.customer_user){
				params.push("customer_user");
				values.push(req.body.sale.customer_user);
			};

			try {
				let sales = await Sale.after_sale.filter(periodStart, periodEnd, req.body.sale.status, params, values);
				res.send({ sales });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
			};
		},
		flow: {
			index: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud'])){
					return res.redirect('/');
				};

				try {
					res.render('ecommerce/sale/after_sale_flow', { user: req.user });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao realizar requisição." });
				};
			},
			add: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud'])){
					return res.send({ unauthorized: "Você não tem permissão para acessar!" });
				};

				let sale = {
					id: req.body.id,
					datetime: new Date().getTime(),
					status: "Ag. Contato",
					user_id: req.user.id,
					user_name: req.user.name
				};
				
				try {
					if(sale.id){
						let verifyStatus = await Sale.findById(sale.id);
						if(verifyStatus[0].after_sale){ return res.send({ done: "Este cliente já está sendo contatado por outro colaborador.", sale: sale }); };

						await Sale.updateAfterSale(sale);
						await Sale.after_sale.flow.add(sale);

						res.send({ done: "Cliente adicionado com sucesso!", sale: sale });
					} else {
						res.send({ msg: "Venda inválida!", sale: sale });
					};
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao cadastrar sua venda, favor contatar o suporte." });
				};
			},
			filter: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud','pro-man','log-pac','COR-GER'])){
					return res.send({ unauthorized: "Você não tem permissão para acessar!" });
				};

				let params = [];
				let values = [];

				let strict_params = [];
				let strict_values = [];

				let periodStart = "";
				let periodEnd = "";

				if(req.body.sale.periodStart && req.body.sale.periodEnd){
					periodStart = req.body.sale.periodStart;
					periodEnd = req.body.sale.periodEnd;
				} else {
					periodStart = "";
					periodEnd = "";
				};

				let props = ["cms_wt_erp.ecommerce_sale_after_sale.id","cms_wt_erp.ecommerce_sale_after_sale.sale_id","cms_wt_erp.ecommerce_sale.origin","cms_wt_erp.ecommerce_sale.code",
					"cms_wt_erp.ecommerce_sale.customer_name","cms_wt_erp.ecommerce_sale.customer_user",
					"cms_wt_erp.ecommerce_sale.customer_phone","cms_wt_erp.ecommerce_sale_after_sale.datetime",
					"cms_wt_erp.ecommerce_sale_after_sale.status","cms_wt_erp.ecommerce_sale_after_sale.user_id",
					"cms_wt_erp.ecommerce_sale_after_sale.user_name","cms_wt_erp.ecommerce_sale_after_sale.contact_datetime",
					"cms_wt_erp.ecommerce_sale.after_sale","cms_wt_erp.ecommerce_sale_after_sale.obs"];

				if(req.body.sale.code){
					params.push("cms_wt_erp.ecommerce_sale.code");
					values.push(req.body.sale.code);
				};

				if(req.body.sale.customer_user){
					params.push("cms_wt_erp.ecommerce_sale.customer_user");
					values.push(req.body.sale.customer_user);
				};

				if(req.body.sale.customer_name){
					params.push("cms_wt_erp.ecommerce_sale.customer_name");
					values.push(req.body.sale.customer_name);
				};


				strict_params.push("cms_wt_erp.ecommerce_sale.after_sale");
				strict_values.push(req.user.id);

				strict_params.push("cms_wt_erp.ecommerce_sale_after_sale.status");
				strict_values.push(req.body.sale.status);

				let inners = [["cms_wt_erp.ecommerce_sale_after_sale.sale_id", "cms_wt_erp.ecommerce_sale.id"]];

				try {
					let sales = await Sale.after_sale.flow.filter(properties, inners, periodStart, periodEnd, params, values, strict_params, strict_values);
					res.send({ sales });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
				};
			},
			update: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud'])){
					return res.send({ unauthorized: "Você não tem permissão para acessar!" });
				};

				let sale = {
					id: req.body.sale.id,
					status: req.body.sale.status,
					contact_datetime: new Date().getTime(),
					obs: req.body.sale.obs
				};

				if(!sale.id){ return res.send({ msg: "Esta compra é inválida!" }); };
				if(!sale.status){ return res.send({ msg: "O status é inválido!" }); };
				
				try {
					await Sale.after_sale.flow.update(sale);
					res.send({ done: "Cliente atualizado com sucesso!", sale: sale });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao cadastrar sua venda, favor contatar o suporte." });
				};
			}
		}
	},
	report: {
		index: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','pro-man','COR-GER'])){
				return res.redirect('/');
			};
			let users = await User.list();
			res.render('ecommerce/sale/report/index', { user: req.user, users: users });
		},
		product: {
			index: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','pro-man','COR-GER'])){
					return res.redirect('/');
				};
				let colors = await Product.color.list();
				let users = await User.list();
				res.render('ecommerce/sale/report/product', { user: req.user, users: users, colors: colors });
			},
			filter: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud','pro-man','log-pac','COR-GER'])){
					return res.send({ unauthorized: "Você não tem permissão para acessar!" });
				};

				let period = { key: "datetime", start: req.body.sale.periodStart, end: req.body.sale.periodEnd };
				let params = { keys: [], values: [] }
				let strict_params = { keys: [], values: [] }

				let product_props = ["ecommerce_sale.id",
					"product.code",
					"product.name",
					"product.color",
					"product.size",
					"ecommerce_sale_product.product_id",
					"ecommerce_sale_product.amount"
				];

				let package_product_props = ["ecommerce_sale.id",
					"product.code",
					"product.name",
					"product.color",
					"product.size",
					"ecommerce_sale_package_product.product_id",
					"ecommerce_sale_package_product.amount"
				];
		
				let product_inners = [
					["cms_wt_erp.ecommerce_sale_product ecommerce_sale_product","cms_wt_erp.ecommerce_sale.id","cms_wt_erp.ecommerce_sale_product.sale_id"],
					["cms_wt_erp.product product","cms_wt_erp.product.id","cms_wt_erp.ecommerce_sale_product.product_id"]
				];

				let package_product_inners = [
					["cms_wt_erp.ecommerce_sale_package_product ecommerce_sale_package_product","cms_wt_erp.ecommerce_sale.id","cms_wt_erp.ecommerce_sale_package_product.sale_id"],
					["cms_wt_erp.product product","cms_wt_erp.product.id","cms_wt_erp.ecommerce_sale_package_product.product_id"]
				];

				lib.Query.fillParam("origin", req.body.sale.origin, params);
				lib.Query.fillParam("product.name", req.body.sale.product_name, params);
				lib.Query.fillParam("product.color", req.body.sale.product_color, params);
				lib.Query.fillParam("ecommerce_sale.status", req.body.sale.status, strict_params);

				let order_params = [ ["ecommerce_sale.id", "DESC"] ];
				let limit = 0;

				try {
					let sale_products = await Sale.filter(product_props, product_inners, period, params, strict_params, order_params, limit);
					let sale_package_products = await Sale.filter(package_product_props, package_product_inners, period, params, strict_params, order_params, limit);
					res.send({ sale_products: sale_products, sale_package_products: sale_package_products });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
				};
			}
		},
		packment: {
			index: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','pro-man','COR-GER'])){
					return res.redirect('/');
				};
				let colors = await Product.color.list();
				let users = await User.list();
				res.render('ecommerce/sale/report/packment', { user: req.user, users: users, colors: colors });
			},
			filter: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud','pro-man','log-pac','COR-GER'])){
					return res.send({ unauthorized: "Você não tem permissão para acessar!" });
				};

				let period = { key: "packing_datetime", start: req.body.sale.periodStart, end: req.body.sale.periodEnd };
				let params = { keys: [], values: [] }
				let strict_params = { keys: [], values: [] }

				let props = ["ecommerce_sale.id",
					"ecommerce_sale.packing_user_id",
					"ecommerce_sale.packing_user_name"
				];
				
				let inners = [];

				lib.Query.fillParam("cms_wt_erp.ecommerce_sale.packing_user_id", req.body.sale.packment_user_id, strict_params);

				let order_params = [ ["ecommerce_sale.id", "DESC"] ];
				let limit = 0;

				try {
					let sale_packments = await Sale.filter(props, inners, period, params, strict_params, order_params, limit);
					res.send({ sale_packments });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
				};
			}
		},
		gathering: {
			index: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','pro-man','COR-GER'])){
					return res.redirect('/');
				};
				let colors = await Product.color.list();
				let users = await User.list();
				res.render('ecommerce/sale/report/gathering', { user: req.user, users: users, colors: colors });
			},
			filter: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud','pro-man','log-pac','COR-GER'])){
					return res.send({ unauthorized: "Você não tem permissão para acessar!" });
				};

				let period = { key: "gathering_datetime", start: req.body.sale.periodStart, end: req.body.sale.periodEnd };
				let params = { keys: [], values: [] }
				let strict_params = { keys: [], values: [] }

				let props = ["ecommerce_sale.id",
					"ecommerce_sale.packing_user_id",
					"ecommerce_sale.packing_user_name"
				];
				
				let inners = [];

				lib.Query.fillParam("cms_wt_erp.ecommerce_sale.packing_user_id", req.body.sale.packment_user_id, strict_params);

				let order_params = [ ["ecommerce_sale.id", "DESC"] ];
				let limit = 0;

				try {
					let sale_packments = await Sale.filter(props, inners, period, params, strict_params, order_params, limit);
					res.send({ sale_packments });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
				};
			}
		}
	}
};

module.exports = saleController;