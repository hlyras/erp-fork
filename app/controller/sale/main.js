const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Sale = require('../../model/sale/main');

const Product = require('../../model/product/main');
Product.color = require('../../model/product/color');

const Customer = require('../../model/customer');

const saleController = {};

saleController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ["adm","com-sel","adm-man","adm-ass","adm-aud","fin-ass"])){
		return res.redirect('/');
	};

	try {
		const productColors = await Product.color.list();
		res.render('sale/index', { productColors, user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

saleController.manage = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud","fin-ass"])){
		return res.redirect('/');
	};

	try {
		let users = await User.list();
		res.render('sale/manage', { user: req.user, users: users });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

saleController.save = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud","fin-ass"])){
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	let sale = req.body.sale;
	sale.user_id = req.user.id;
	sale.user_name = req.user.name;
	sale.products = JSON.parse(req.body.sale.products);
	sale.product_actions = { add: [], update: [], remove: [] } ;
	sale.packages = JSON.parse(req.body.sale.packages);
	sale.package_actions = { add: [], update: [], remove: [] } ;
	sale.package_product_actions = { add: [], update: [], remove: [] } ;
	sale.weight = parseInt(req.body.sale.weight);
	sale.obs = req.body.sale.obs;

	if(!sale.customer_id){ return res.send({ msg: "É necessário selecionar o cliente" }); };
	if(sale.customer_address_id == undefined){ return res.send({ msg: "É necessário selecionar o endereço do cliente" }); };
	if(!sale.sale_date){ return res.send({ msg: "É necessário selecionar a data da venda" }); };
	if(!sale.shipment_method){ return res.send({ msg: "É necessário selecionar o método de envio" }); };
	if(sale.shipment_method == "Retirada em Loja" && parseInt(sale.customer_address_id) !== 0){ return res.send({ msg: "Método de envio não condiz com endereço selecionado." }); };
	if(sale.shipment_method != "Retirada em Loja" && parseInt(sale.customer_address_id) === 0){ return res.send({ msg: "Método de envio não condiz com endereço selecionado." }); };
	if(!sale.payment_method){ return res.send({ msg: "É necessário selecionar o método de pagamento" }); };
	if(!sale.payment_period){ return res.send({ msg: "É necessário selecionar o prazo de pagamento" }); };
	if(!sale.status){ return res.send({ msg: "É necessário selecionar o status da venda" }); };
	if(!sale.products.length && !sale.packages.length){ return res.send({ msg: "É necessário selecionar ao menos um produto ou pacote." }); };
	if(sale.weight < 0){ return res.send({ msg: "O peso da venda é inválido!" }); };
	if(sale.value < 0){ return res.send({ msg: "O valor da venda é inválido!" }); };
	if(!sale.shipment_date){ sale.shipment_date = ""; };
	if(sale.obs.length > 154){ return res.send({ msg: "A observação deve ser breve!" }); };

	try {
		if(!sale.id){
			let row = await Sale.save(sale);
			sale.id = row.insertId;

			for(i in sale.products){
				sale.products[i].product_info = sale.products[i].code+" | "+sale.products[i].name+" | "+sale.products[i].color+" | "+sale.products[i].size;
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
			await Sale.update(sale);

			// // // // // // // // 
			// sale product updates
			// // // // // // // // 
			let db_sale_products = await Sale.product.list(sale.id);
			if(!db_sale_products.length && sale.products.length){
				for(i in sale.products){
					sale.products[i].product_info = sale.products[i].code+" | "+sale.products[i].name+" | "+sale.products[i].color+" | "+sale.products[i].size;
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
					sale.product_actions.add[i].product_info = ""+sale.product_actions.add[i].code+" | "+sale.product_actions.add[i].name+" | "+sale.product_actions.add[i].color+" | "+sale.product_actions.add[i].size;
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

			// // // // // // // // 
			// sale package products updates
			// // // // // // // // 
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
};

saleController.filter = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud",'pro-man','COR-GER','log-pac','fin'])){
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	const props = [];
	const inners = [];

	const period = { key: "sale_date", start: req.body.sale.periodStart, end: req.body.sale.periodEnd };
	const params = { keys: [], values: [] }
	const strict_params = { keys: [], values: [] }

	lib.Query.fillParam("sale.customer_name", req.body.sale.customer_name, params);
	lib.Query.fillParam("sale.customer_cnpj", req.body.sale.customer_cnpj, params);
	lib.Query.fillParam("sale.status", req.body.sale.status, strict_params);

	if(req.body.sale.status == "Em negociação"){
		lib.Query.fillParam("sale.user_id", req.user.id, strict_params);
	} else {
		if(req.body.sale.user_id){
			lib.Query.fillParam("sale.user_id", req.body.sale.user_id, strict_params);
		};
	};

	const order_params = [ ["id","DESC"] ];
	const limit = 0;
	
	try {
		let sales = await Sale.filter(props, inners, period, params, strict_params, order_params, limit);
		res.send({ sales });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
	};
};

saleController.findById = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud",'pro-man','COR-GER','log-pac',"fin-ass"])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		let sale = await Sale.findById(req.params.id);
		let customer = await Customer.findBy.id(sale[0].customer_id);
		sale[0].customer = customer[0];
		customer.address = await Customer.address.findBy.id(sale[0].customer_address_id);
		sale[0].customer.address = customer.address[0];
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
};

saleController.cancel = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud"])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let sale = {
		id: req.params.id,
		cancelation_user_id: req.user.id,
		cancelation_user_name: req.user.name,
		cancelation_confirmation_date: new Date().getTime(),
		status: "Cancelada"
	};

	try {
		await Sale.cancel(sale);
		res.send({ done: "Pagamento confirmado com sucesso!" });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar a venda, favor contatar o suporte." });
	};
};

module.exports = saleController;