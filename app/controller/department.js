const User = require('../model/user');
const userController = require('./user');

const Department = require('../model/department');

const departmentController = {
	index: (req, res) => {
		res.render('user/profile', { user: req.user });
	},
	admin: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
	},
	manage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		const departments = await Department.list();

		res.render('department/manage', { user: req.user, departments: departments });
	},
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const department = {
			name: req.body.name,
			abbreviation: req.body.abbreviation
		};

		if(department.name.length < 3 || department.name.length > 45){
			return res.send({ msg: "O nome do departamento deve conter mais de 3 caracteres." });
		};

		if(department.abbreviation.length < 3 || department.abbreviation.length > 3){
			return res.send({ msg: "A abreviação do departamento deve conter 3 caracteres." });
		};

		try {
			await Department.save(department)
			res.send({ done: "Departamento cadastrado com sucesso!" });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Não foi possível cadastrar o departamento."});
		};
	},
	list: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			const departments = await Department.list();
			res.send({ departments });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Não foi possível listar os departamentos."});
		};
	},
	role: {
		save: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			const role = {
				department_id: req.body.department_id,
				name: req.body.name,
				abbreviation: req.body.abbreviation
			};

			if(role.name.length < 3 || role.name.length > 45){
				return res.send({ msg: "O nome do cargo deve conter mais de 3 caracteres." });
			};

			if(role.abbreviation.length < 3 || role.abbreviation.length > 3){
				return res.send({ msg: "A abreviação do cargo deve conter 3 caracteres." });
			};
			
			try {
				await Department.Role.save(role);
				res.send({ done: "Cargo cadastrado com sucesso!" });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao cadastrar o cargo, favor contatar o suporte."});
			};
		},
		list: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				const departmentRoles = await Department.Role.list();
				res.send({ departmentRoles });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Não foi possível listar os departamentos."});
			};
		}
	}
};

module.exports = departmentController;