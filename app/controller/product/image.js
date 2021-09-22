const userController = require('./../user');

const Product = require('../../model/product/main');
Product.image = require('../../model/product/image');

const productController = require('./main');

productController.image = {}

productController.image.add = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','n/a','adm-vis'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	const image = new Product.image();
	image.product_id = req.body.product_id;
	image.url = req.body.url;

	try {
		await image.add();
		res.send({ done: 'Imagem adicionada com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao incluir a imagem, favor contatar o suporte." });
	};
};

productController.image.remove = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','adm-vis'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		await Product.image.remove(req.query.image_id);
		res.send({ done: 'Imagem excluída!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao remover a imagem do produto, favor contatar o suporte." });
	};
};

module.exports = productController.image;