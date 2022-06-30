const User = require('../../../model/user');
const userController = require('./../../user');
const Product = require('../../../model/product/main');

const lib = require("jarmlib");

const conferencyController = {};

conferencyController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','pro-man'])){
		return res.redirect('/');
	};

	try {
		const productColors = await Product.color.list();
		res.render('product/conferency/index', { user: req.user, productColors });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
	};
};

conferencyController.filter = async (req, res) => {
	let props = [];
	let inners = [
		["cms_wt_erp.product_image product_image","product.id","product_image.product_id"]
	];

	const params = { keys: [], values: [] };
	const strict_params = { keys: [], values: [] };

	lib.Query.fillParam("product.code", req.body.product.code, strict_params);
	lib.Query.fillParam("product.name", req.body.product.name, params);
	lib.Query.fillParam("product.color", req.body.product.color, strict_params);
	lib.Query.fillParam("product.brand", req.body.product.brand, params);

	let order_params = [ ["product.code","ASC"] ];

	try {
		const products = await Product.filter(props, inners, params, strict_params, order_params);
		res.send({ products });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
	};
};

module.exports = conferencyController;