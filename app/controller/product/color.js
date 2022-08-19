const Product = require('../../model/product/main');
Product.color = require('../../model/product/color');

const productController = require('./main');

productController.color = {};

productController.color.save = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};
	
	const color = {
		name: req.body.color_name,
		shortcut: req.body.color_shortcut
	};

	try {
		await Product.color.save(color);
		res.send({ done: 'Cor cadastrada com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao salvar a cor, favor contatar o suporte." });
	};
};

productController.color.list = async (req, res) => {
	try {
		const colors = await Product.color.list();
		res.send(colors);
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao listar as cores, favor contatar o suporte." });
	};
};

module.exports = productController.color;