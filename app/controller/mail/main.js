const userController = require('./../user');
const Mail = require('../../model/mail/main');

const lib = require("jarmlib");

const mailController = {};

mailController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-sel'])) {
		return res.redirect('/');
	};
	res.render('mail/index', { user: req.user });
};

mailController.manage = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.redirect('/');
	};
	res.render('mail/manage/index', { user: req.user });
};

mailController.emitter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-man', 'com-sel'])) {
		return res.redirect('/');
	};
	res.render('mail/emitter/index', { user: req.user });
};

mailController.create = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-man', "com-ass", 'com-sel', 'adm-aud'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let mail = new Mail();
	mail.id = req.body.id;
	mail.datetime = new Date().getTime();
	mail.title = req.body.title;
	mail.description = req.body.description;
	mail.subject = req.body.subject;
	mail.text = req.body.text;
	mail.content = req.body.content.replaceAll(`'`, `\\'`);
	mail.user_id = req.user.id;

	try {
		if (!mail.id) {
			let response = await mail.save();
			if (response.err) { return res.send({ msg: response.err }); }
			res.send({ done: "E-mail criado com sucesso!" });
		} else {
			let response = await mail.update();
			if (response.err) { return res.send({ msg: response.err }); }
			res.send({ done: "E-mail atualizado com sucesso!" });
		}

	} catch (err) {
		if (err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: " + err.sqlMessage.split("'")[1] }); }
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar o e-mail, favor contate o suporte!" });
	};
};

mailController.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-man', "com-ass", 'com-sel', 'adm-aud'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let params = { keys: [], values: [] };

	lib.Query.fillParam("mail.title", req.body.title, params);
	lib.Query.fillParam("mail.description", req.body.description, params);

	let orderParams = [["id", "ASC"]];

	try {
		const mails = await Mail.filter([], [], params, [], orderParams);
		res.send({ mails });
	} catch (err) {
		if (err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: " + err.sqlMessage.split("'")[1] }); }
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar o E-mail, favor contate o suporte!" });
	};
};

mailController.findById = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-man', 'com-sel'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		const mail = (await Mail.findById(req.params.id))[0];
		res.send({ mail });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar o E-mail, favor contatar o suporte." });
	};
};

mailController.delete = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		await Mail.delete(req.params.id);
		res.send({ done: "E-mail excluído com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar o E-mail, favor contatar o suporte." });
	};
};

module.exports = mailController;