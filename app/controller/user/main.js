const lib = require("jarmlib");
const User = require('../../model/user/main');

const bcrypt = require('bcrypt-nodejs');

const userController = {};

userController.index = (req, res) => {
	res.render('user/profile', { user: req.user });
};

userController.create = async (req, res) => {
	if (!userController.verifyAccess(req, res, ["adm"])) {
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	let user = new User();
	user.id = req.body.id;
	user.name = req.body.name;
	user.username = req.body.username;
	user.password = bcrypt.hashSync(req.body.password, null, null);
	user.access = req.body.access;
	user.pass = req.body.pass;

	try {
		var foundUser = await User.findByUsername(user.username);
		if (foundUser.length) { return res.send({ msg: "Este usuário já está cadastrado." }) };

		let createdUser = await user.create();
		if (createdUser.err) { return res.send({ msg: createdUser.err }); }

		res.send({ done: "Informações atualizadas com sucesso.", user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao atualizar suas informações, favor contatar o suporte." });
	};
};

userController.verifyPass = async (pass, access) => {
	if (!pass || pass.length < 4) { return false; }

	let user = (await User.findByPass(pass))[0];
	if (!user) { return false; }

	for (let i in access) {
		if (access[i] == user.access) {
			return user;
		};
	};

	return false;
};

userController.verify = (req, res, next) => {
	if (req.isAuthenticated()) { return next() };
	res.redirect('/login');
};

userController.verifyAccess = (req, res, access) => {
	if (req.isAuthenticated()) {
		for (let i in access) {
			if (access[i] == req.user.access) {
				return true;
			};
		};
	};
	return false;
};

userController.filter = async (req, res) => {
	let props = ["user.id", "user.name", "user.username", "user.phone", "user.department", "user.role"];

	const params = { keys: [], values: [] };
	const strict_params = { keys: [], values: [] };

	lib.Query.fillParam("user.id", req.body.id, strict_params);
	lib.Query.fillParam("user.name", req.body.name, params);
	lib.Query.fillParam("user.username", req.body.username, params);
	lib.Query.fillParam("user.phone", req.body.phone, params);
	lib.Query.fillParam("user.department", req.body.department, strict_params);
	lib.Query.fillParam("user.role", req.body.role, strict_params);

	let order_params = [["user.id", "ASC"]];

	try {
		const users = await User.filter({ props, params, strict_params, order_params });
		res.send({ users });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
	};
};

userController.list = async (req, res) => {
	if (!userController.verifyAccess(req, res, ['dvp', 'prp', 'spt', 'grf', 'grl', 'crd'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};
	try {
		let users = await User.list();
		res.send({ users: users });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao listar os usuários, favor contatar o suporte." });
	};
};

userController.show = async (req, res) => {
	if (!userController.verifyAccess(req, res, ['dvp', 'prp', 'spt', 'grf', 'grl', 'crd'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		let user = await User.findById(req.body.user_id);
		res.send({ user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao mostrar o usuário." });
	};
};

userController.updateInfo = async (req, res) => {
	if (!req.isAuthenticated()) {
		res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	const user = {
		id: req.user.id,
		email: req.body.user.email
	};

	try {
		if (user.email) {
			var row = await User.findByEmail(user.email);
			if (row.length) { return res.send({ msg: "Este e-mail já está cadastrado." }) };
		};
		row = await User.updateInfo(user);
		res.send({ done: "Informações atualizadas com sucesso.", user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao atualizar suas informações, favor contatar o suporte." });
	};
};

userController.updatePassword = async (req, res) => {
	if (!req.isAuthenticated()) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let user = new User();
	user.id = req.user.id;
	user.password = bcrypt.hashSync(req.body.password, null, null);

	if (!req.body.password || req.body.password < 4) { return res.send({ msg: 'Senha inválida.' }); };
	if (req.body.password !== req.body.password_confirm) { return res.send({ msg: 'As senhas não correspondem.' }); }

	try {
		let response = await user.update();
		if (response.err) { return res.send(response.err); }

		res.send({ done: "Senha alterada com sucesso.", user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao alterar sua senha, favor contatar o suporte." });
	};
};

module.exports = userController;