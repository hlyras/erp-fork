const Product = require('../../model/product/main');
Product.category = require('../../model/product/category');

const productController = require('./main');

productController.category = {};

productController.category.save = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	}

	const category = {
		name: req.body.product_category_name,
		shortcut: req.body.product_category_shortcut
	};

	try {
		await Product.category.save(category);
		res.send({ done: 'Categoria cadastrada com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar a categoria." });
	};
};

productController.category.list = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','n/a'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	}

	try {
		const categories = await Product.category.list();
		res.send({ categories });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao listar categorias." });
	};
};

module.exports = productController.category;