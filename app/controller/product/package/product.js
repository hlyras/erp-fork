const Product = require('../../../model/product/main');
Product.package = require('../../../model/product/package/main');
Product.package.image = require('../../../model/product/package/image');
Product.package.product = require('../../../model/product/package/product');

const lib = require("jarmlib");

const userController = require('./../../user');

productController = {};

productController.update = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','man','adm-man'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let package = {
		id: req.body.package.id,
		products: JSON.parse(req.body.package.products)
	};

	let actions = { add: [], update: [], remove: [] };

	try {
		let db_package_products = await Product.package.product.list(package.id);

		if(!db_package_products.length && package.products.length){
			for(i in package.products){
				package.products[i].info = ""+package.products[i].code+" | "+package.products[i].name+" | "+package.products[i].color+" | "+package.products[i].size;
				await Product.package.product.add(package.id, package.products[i]);
			};
		} else if(db_package_products.length && !package.products.length){
			await Product.package.product.removeAll(package.id);
		} else if(db_package_products.length && package.products.length){
			package.products = db_package_products.reduce((products, product) => {
				for(i in products){ if(products[i].product_id == product.product_id){ return products; }; };
				actions.remove.push(product);
				return products;
			}, package.products);

			db_package_products = package.products.reduce((products, product) => {
				for(i in products){ if(products[i].product_id == product.product_id){ actions.update.push(product); return products; }; };
				actions.add.push(product);
				return products;
			}, db_package_products);

			for(i in actions.add){
				actions.add[i].info = ""+actions.add[i].code+" | "+actions.add[i].name+" | "+actions.add[i].color+" | "+actions.add[i].size;
				await Product.package.product.add(package.id, actions.add[i]);
			};
			for(i in actions.update){ await Product.package.product.update(actions.update[i].id, actions.update[i]); };
			for(i in actions.remove){ await Product.package.product.remove(actions.remove[i].id); };
		};

		res.send({ done: "Produtos atualizados com sucesso!", package });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
	};
};

module.exports = productController;