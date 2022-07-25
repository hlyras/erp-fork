const lib = require("jarmlib");

const User = require('../../model/user');
const userController = require('./../user');

const Department = require('../../model/department/main');

const departmentController = {};

departmentController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm', 'adm-man'])){
		return res.redirect("/");
	};

	res.render('department/manage/index', { user: req.user });
};

departmentController.save = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm', 'adm-man'])){
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	const department = new Department();
	department.name = req.body.name;
	department.code = req.body.code.toUpperCase();

	try {
		let result = await department.save();
		if(result.err){ return res.send({ msg: result.err }); }

		res.send({ done: "Departamento cadastrado com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar o departamento, por favor recarregue a página e tente novamente." });
	};
};

departmentController.filter = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm', 'adm-man'])){
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	const params = { keys: [], values: [] };
	const strict_params = { keys: [], values: [] };

	try {
		let departments = await Department.filter([],[],params,strict_params,[]);

		res.send({ departments });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar o departamento, por favor recarregue a página e tente novamente." });
	};
};

departmentController.getById = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm', 'adm-man'])){
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	try {
		let department = await Department.getById(req.params.id);

		res.send({ department });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao encontrar o departamento, por favor recarregue a página e tente novamente." });
	}
};

module.exports = departmentController;