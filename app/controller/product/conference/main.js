const User = require('../../../model/user');
const userController = require('./../../user/main');

const Product = require('../../../model/product/main');
Product.conference = require('../../../model/product/conference');

const lib = require("jarmlib");

const conferenceController = {};

conferenceController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
		return res.redirect('/');
	};

	try {
		res.render('product/conference/index', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
	};
};

conferenceController.viewer = async (req, res) => {
	try {
		const productColors = await Product.color.list();
		res.render('product/conference/viewer/index', { user: req.user, productColors });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
	};
};

conferenceController.manage = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
		return res.redirect('/');
	};

	try {
		const productColors = await Product.color.list();
		res.render('product/conference/manage/index', { user: req.user, productColors });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
	};
};

conferenceController.create = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
	};

	let conference = new Product.conference();
	conference.id = req.body.id;
	conference.product_id = req.body.product_id;
	conference.video_url = req.body.video_url;
	conference.description = req.body.description;
	conference.user_id = req.user.id;

	try {
		if (!conference.id) {
			let response = await conference.create();
			if (response.err) { return res.send({ msg: response.err }); }
			return res.send({ done: "Conferência cadastrada com sucesso!" });
		} else {
			let response = await conference.update();
			if (response.err) { return res.send({ msg: response.err }); }
			return res.send({ done: "Conferência atualizada com sucesso!" });
		}
	} catch (err) {
		console.log(err);
		return res.send({ msg: "Ocorreu um erro ao atualizar as informações do produto, favor contatar o suporte." });
	}
};

conferenceController.filter = async (req, res) => {
	let props = [];
	let inners = [];

	const params = { keys: [], values: [] };
	const strict_params = { keys: [], values: [] };

	lib.Query.fillParam("product_conference.product_id", req.body.product_id, strict_params);
	lib.Query.fillParam("product_conference.description", req.body.description, params);
	lib.Query.fillParam("product_conference.video_url", req.body.video_url, params);

	let order_params = [["product_conference.id", "ASC"]];

	try {
		const conferences = await Product.conference.filter({ props, inners, params, strict_params, order_params });
		res.send({ conferences });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
	};
};

conferenceController.findById = async (req, res) => {
	try {
		const conference = (await Product.conference.findById(req.params.id))[0];
		res.send({ conference });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
	};
};

conferenceController.delete = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		await Product.conference.delete(req.params.id);
		res.send({ done: 'Conferência excluída com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao remover a conferência, favor entrar em contato com o suporte." });
	};
};

module.exports = conferenceController;