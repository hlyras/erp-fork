const User = require('../../../model/user');
const userController = require('./../../user');
const Product = require('../../../model/product/main');
Product.conference = require('../../../model/product/conference');

const lib = require("jarmlib");

const conferenceController = {};

conferenceController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','pro-man'])){
		return res.redirect('/');
	};

	try {
		const productColors = await Product.color.list();
		res.render('product/conference/index', { user: req.user, productColors });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
	};
};

conferenceController.info = {};

conferenceController.info.index = async (req, res) => {
	// if(!await userController.verifyAccess(req, res, ['adm','pro-man'])){
	// 	return res.redirect('/');
	// };

	try {
		const productColors = await Product.color.list();
		res.render('product/conference/info/index', { user: req.user, productColors });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
	};
};

conferenceController.info.manage = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','pro-man'])){
		return res.redirect('/');
	};

	try {
		const productColors = await Product.color.list();
		res.render('product/conference/info/manage', { user: req.user, productColors });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
	};
};

conferenceController.info.filter = async (req, res) => {
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

conferenceController.info.update = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','pro-man'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
	};

	let product = {
		id: req.body.id,
		conference_video: req.body.conference_video,
		conference_obs: req.body.conference_obs
	};

	try {
		await Product.conference.info.update(product);
		res.send({ done: "Produto atualizado com sucesso!" });
	} catch (err) {
		console.log(err);
		return res.send({ msg: "Ocorreu um erro ao atualizar as informações do produto, favor contatar o suporte." });
	}
};

module.exports = conferenceController;