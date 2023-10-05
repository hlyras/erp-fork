const userController = require('./../../user/main');
const User = require('../../../model/user');
const Prospect = require('../../../model/customer/prospect');

const lib = require("jarmlib");

const Mailer = require('../../../middleware/mailer');
const ejs = require("ejs");
const path = require('path');

const prospectController = {};

prospectController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass', 'com-pro'])) {
		return res.redirect('/');
	};
	res.render('customer/prospect/manage/index', { user: req.user });
};

prospectController.save = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass', 'com-pro'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	const prospect = new Prospect();
	prospect.datetime = new Date().getTime();
	prospect.brand = req.body.brand;
	prospect.state = req.body.state;
	prospect.city = req.body.city;
	prospect.phone = req.body.phone;
	prospect.status = "Ag. contato";
	prospect.social_media = req.body.social_media;
	prospect.product_approach = req.body.product_approach;
	prospect.user_id = req.user.id;

	try {
		let saveResponse = await prospect.save();
		if (saveResponse.err) { return res.send({ msg: saveResponse.err }); }
		res.send({ done: "Lead cadastrado com sucesso!" });
	} catch (err) {
		if (err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: " + err.sqlMessage.split("'")[1] }); }
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar o Lead, favor contate o suporte!" });
	};
};

prospectController.update = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass', 'com-pro'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	const prospect = new Prospect();
	prospect.id = req.body.id;
	prospect.brand = req.body.brand;
	prospect.state = req.body.state;
	prospect.city = req.body.city;
	prospect.phone = req.body.phone;
	prospect.social_media = req.body.social_media;
	prospect.product_approach = req.body.product_approach;
	prospect.name = req.body.name;
	prospect.email = req.body.email;
	prospect.cellphone = req.body.cellphone;
	prospect.status = req.body.status;
	prospect.user_id = req.user.id;

	try {
		const verifyUserId = (await Prospect.findById(prospect.id))[0].user_id;
		if (req.user.id != verifyUserId) { return res.send({ msg: "Você não tem autorização para atualizar este prospect" }); }

		let updateResponse = await prospect.update();
		if (updateResponse.err) { return res.send({ msg: updateResponse.err }); }
		res.send({ done: "Lead atualizado com sucesso!" });
	} catch (err) {
		if (err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: " + err.sqlMessage.split("'")[1] }); }
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar o Lead, favor contate o suporte!" });
	};
};

prospectController.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass', 'com-pro'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	const prospect = {
		status: req.body.status,
		brand: req.body.brand,
		state: req.body.state,
		periodStart: req.body.periodStart,
		periodEnd: req.body.periodEnd
	};

	let period = { key: "customer_prospect.datetime", start: req.body.periodStart, end: req.body.periodEnd };
	let params = { keys: [], values: [] };
	let strictParams = { keys: [], values: [] };

	lib.Query.fillParam("customer_prospect.status", req.body.status, params);
	lib.Query.fillParam("customer_prospect.brand", req.body.brand, params);
	lib.Query.fillParam("customer_prospect.state", req.body.state, strictParams);
	lib.Query.fillParam("customer_prospect.user_id", req.user.id, strictParams);

	let orderParams = [["datetime", "ASC"], ["id", "ASC"]];

	try {
		let prospects = await Prospect.filter([], [], period, params, strictParams, orderParams, 0);
		for (let i in prospects) { prospects[i].comments = await Prospect.log.list(prospects[i].id); };

		res.send({ prospects });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar os leads, favor contatar o suporte!" });
	};
};

prospectController.findById = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass', 'com-pro'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		let prospect = (await Prospect.findById(req.params.id))[0];
		prospect.comments = await Prospect.log.list(req.params.id);

		res.send({ prospect });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar os leads, favor contatar o suporte!" });
	};
};

prospectController.log = {};

prospectController.log.create = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass', 'com-pro'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	const log = new Prospect.log();
	log.datetime = new Date().getTime();
	log.prospect_id = req.body.prospect_id;
	log.comment = req.body.comment;
	log.user_id = req.user.id;

	try {
		const verifyUser = (await Prospect.findById(log.prospect_id))[0];
		if (req.user.id != verifyUser.user_id) { return res.send({ msg: "Você não tem autorização para atualizar este prospect" }); }

		log.fromstatus = verifyUser.status;

		let createResponse = await log.create();
		if (createResponse.err) { return res.send({ msg: createResponse.err }); }
		res.send({ done: "Comentário adicionado com sucesso!" });
	} catch (err) {
		if (err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: " + err.sqlMessage.split("'")[1] }); }
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao adicionar o comentário, favor contate o suporte!" });
	};
};

module.exports = prospectController;