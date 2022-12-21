const userController = require('./../../user');
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
	res.render('customer/prospect/index', { user: req.user });
};

prospectController.save = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass', 'com-pro'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	const prospect = new Prospect();
	prospect.datetime = new Date().getTime();
	prospect.brand = req.body.brand;
	prospect.state = req.body.state;
	prospect.phone = req.body.phone;
	prospect.social_media = req.body.social_media;
	prospect.product_approach = req.body.product_approach;
	prospect.user_id = req.user.id;

	try {
		let saveProspect = await prospect.save();
		if (saveProspect.err) { return res.send({ msg: saveProspect.err }); }
		res.send({ done: "Lead cadastrado com sucesso!" });
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

prospectController.confirmContact1 = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass', 'com-pro'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let mainProspect = await Prospect.findById(req.body.id);

	if (!mainProspect.length) { return res.send({ msg: "Lead inválido, por favor atualize a página e tente novamente!" }); }
	if (mainProspect[0].status != "1º contato") { return res.send({ msg: "Este Lead não está mais neste status, por favor atualize a página e tente novamente!" }); }

	if (req.body.status == "Contatar loja novamente") {
		if (!req.body.comment) { return res.send({ msg: "É necessário informar nas observações o que ocorreu durante o contato." }); };
	}

	if (req.body.status == "Contato com responsável") {
		if (!req.body.name && !mainProspect[0].name) { return res.send({ msg: "É necessário cadastrar o nome do responsável para o próximo contato." }); }
		// if(!req.body.email && !mainProspect[0].email) { return res.send({ msg: "É necessário ter um email cadastrado antes do próximo contato." }); }	
		if (!req.body.cellphone && !mainProspect[0].cellphone) { return res.send({ msg: "É necessário ter o número de WhatsApp do responsável para fazer o contato." }); }
		// if(!req.body.meeting) { return res.send({ msg: "É necessário informar o horário da reunião." }); };
		if (!req.body.comment) { return res.send({ msg: "É necessário informar nas observações o que ocorreu durante o contato." }); };
	}

	if (req.body.status == "Lista de transmissão") {
		if (!req.body.name && !mainProspect[0].name) { return res.send({ msg: "É necessário cadastrar o nome do responsável para o próximo contato." }); }
		if (!req.body.email && !mainProspect[0].email) { return res.send({ msg: "É necessário ter um email cadastrado." }); }
		if (!req.body.cellphone && !mainProspect[0].cellphone) { return res.send({ msg: "É necessário ter o número de WhatsApp do responsável para fazer o contato." }); }
		if (!req.body.comment) { return res.send({ msg: "É necessário informar nas observações o que ocorreu durante o contato." }); };
	}

	if (!req.body.status) { return res.send({ msg: "É necessário selecionar o status do Lead." }); };

	let prospect = { id: mainProspect[0].id };
	if (req.body.name) { prospect.name = req.body.name; }
	if (req.body.email) { prospect.email = req.body.email; }
	if (req.body.cellphone) { prospect.cellphone = req.body.cellphone; }
	if (req.body.meeting) { prospect.meeting = req.body.meeting; }
	if (req.body.status) { prospect.status = req.body.status; }

	let prospect_log = new Prospect.log();
	prospect_log.datetime = new Date().getTime();
	prospect_log.prospect_id = mainProspect[0].id;
	prospect_log.fromstatus = mainProspect[0].status;
	prospect_log.tostatus = req.body.status;
	prospect_log.comment = req.body.comment;
	prospect_log.user_id = req.user.id;

	try {
		let response = await Prospect.update(prospect);
		let response_log = await prospect_log.save();
		res.send({ done: "Lead atualizado com sucesso!" });
	} catch (err) {
		if (err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: " + err.sqlMessage.split("'")[1] }); }
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao atualizar o Lead, favor contate o suporte!" });
	};
};

prospectController.confirmContact2 = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass', 'com-pro'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let mainProspect = await Prospect.findById(req.body.id);

	if (!mainProspect.length) { return res.send({ msg: "Lead inválido, por favor atualize a página e tente novamente!" }); }
	if (mainProspect[0].status != "Contatar loja novamente") { return res.send({ msg: "Este Lead não está mais neste status, por favor atualize a página e tente novamente!" }); }

	if (req.body.status == "Contatar loja novamente") {
		if (!req.body.comment) { return res.send({ msg: "É necessário informar nas observações o que ocorreu durante o contato." }); };
	}

	if (req.body.status == "Contato com responsável") {
		if (!req.body.name && !mainProspect[0].name) { return res.send({ msg: "É necessário cadastrar o nome do responsável para o próximo contato." }); }
		// if(!req.body.email && !mainProspect[0].email) { return res.send({ msg: "É necessário ter um email cadastrado antes do próximo contato." }); }
		if (!req.body.cellphone && !mainProspect[0].cellphone) { return res.send({ msg: "É necessário ter o número de WhatsApp do responsável para fazer o contato." }); }
		// if(!req.body.meeting) { return res.send({ msg: "É necessário informar o horário da reunião." }); };
		if (!req.body.comment) { return res.send({ msg: "É necessário informar nas observações o que ocorreu durante o contato." }); };
	}

	if (req.body.status == "Lista de transmissão") {
		if (!req.body.email && !mainProspect[0].email) { return res.send({ msg: "É necessário ter um email cadastrado." }); }
		if (!req.body.cellphone && !mainProspect[0].cellphone) { return res.send({ msg: "É necessário ter o número de WhatsApp do responsável para fazer o contato." }); }
		if (!req.body.comment) { return res.send({ msg: "É necessário informar nas observações o que ocorreu durante o contato." }); };
	}

	if (!req.body.status) { return res.send({ msg: "É necessário selecionar o status do Lead." }); };

	let prospect = { id: mainProspect[0].id };
	if (req.body.name) { prospect.name = req.body.name; }
	if (req.body.email) { prospect.email = req.body.email; }
	if (req.body.cellphone) { prospect.cellphone = req.body.cellphone; }
	if (req.body.meeting) { prospect.meeting = req.body.meeting; }
	if (req.body.status) { prospect.status = req.body.status; }

	let prospect_log = new Prospect.log();
	prospect_log.datetime = new Date().getTime();
	prospect_log.prospect_id = mainProspect[0].id;
	prospect_log.fromstatus = mainProspect[0].status;
	prospect_log.tostatus = req.body.status;
	prospect_log.comment = req.body.comment;
	prospect_log.user_id = req.user.id;

	try {
		let response = await Prospect.update(prospect);
		let response_log = await prospect_log.save();
		res.send({ done: "Lead atualizado com sucesso!" });
	} catch (err) {
		if (err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: " + err.sqlMessage.split("'")[1] }); }
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao atualizar o Lead, favor contate o suporte!" });
	};
};

prospectController.confirmContact3 = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass', 'com-pro'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let mainProspect = await Prospect.findById(req.body.id);

	if (!mainProspect.length) { return res.send({ msg: "Lead inválido, por favor atualize a página e tente novamente!" }); }
	if (mainProspect[0].status != "Contato com responsável") { return res.send({ msg: "Este Lead não está mais neste status, por favor atualize a página e tente novamente!" }); }

	if (req.body.status == "Lista de transmissão") {
		if (!req.body.email && !mainProspect[0].email) { return res.send({ msg: "É necessário ter um email cadastrado." }); }
		if (!req.body.comment) { return res.send({ msg: "É necessário informar nas observações o que ocorreu durante o contato." }); };
		if (!req.body.rating && !mainProspect[0].rating) { return res.send({ msg: "É necessário avaliar a qualidade do lead." }); };
	}

	if (!req.body.status) { return res.send({ msg: "É necessário selecionar o status do Lead." }); };

	let prospect = { id: mainProspect[0].id };
	if (req.body.email) { prospect.email = req.body.email; }
	if (req.body.rating) { prospect.rating = req.body.rating; }
	if (req.body.status) { prospect.status = req.body.status; }

	let prospect_log = new Prospect.log();
	prospect_log.datetime = new Date().getTime();
	prospect_log.prospect_id = mainProspect[0].id;
	prospect_log.fromstatus = mainProspect[0].status;
	prospect_log.tostatus = req.body.status;
	prospect_log.comment = req.body.comment;
	prospect_log.user_id = req.user.id;

	try {
		let response = await Prospect.update(prospect);
		let response_log = await prospect_log.save();
		res.send({ done: "Lead atualizado com sucesso!" });
	} catch (err) {
		if (err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: " + err.sqlMessage.split("'")[1] }); }
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao atualizar o Lead, favor contate o suporte!" });
	};
};

module.exports = prospectController;