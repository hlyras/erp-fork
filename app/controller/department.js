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
			id: req.body.id,
			name: req.body.name,
			abbreviation: req.body.abbreviation
		};

		if(department.name.length < 3 || department.name.length > 45){
			return res.send({ msg: "O nome do departamento deve conter mais de 3 caracteres." });
		};

		if(department.abbreviation.length < 2 || department.abbreviation.length > 3){
			return res.send({ msg: "A abreviação do departamento deve conter 3 caracteres." });
		};

		if(!department.id){
			try {
				await Department.save(department)
				res.send({ done: "Departamento cadastrado com sucesso!" });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Não foi possível cadastrar o departamento."});
			};
		} else {
			try {
				await Department.update(department)
				res.send({ done: "Departamento atualizado com sucesso!" });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Não foi possível atualizar o departamento."});
			};
		};
	},
	findById: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			const department = await Department.findById(req.params.id);
			department[0].roles = await Department.Role.findByDepartmentId(req.params.id);
			console.log(department);
			res.send({ department });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Não foi possível listar os departamentos."});
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
	remove: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			await Department.remove(req.body.department_id);
			await Department.Role.removeByDepartmentId(req.body.department_id);
			res.send({ done: "Departamento e cargos excluídos com sucesso!" });
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
				id: req.body.id,
				department_id: req.body.department_id,
				name: req.body.name,
				abbreviation: req.body.abbreviation
			};

			if(role.name.length < 3 || role.name.length > 45){
				return res.send({ msg: "O nome do cargo deve conter o mínimo de 3 caracteres." });
			};

			if(role.abbreviation.length < 2 || role.abbreviation.length > 3){
				return res.send({ msg: "A abreviação do cargo deve conter o mínimo de 2 caracteres." });
			};

			if(!role.id){
				try {
					await Department.Role.save(role);
					res.send({ done: "Cargo cadastrado com sucesso!" });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao cadastrar o cargo, favor contatar o suporte."});
				};
			} else {
				try {
					await Department.Role.update(role);
					res.send({ done: "Cargo atualizado com sucesso!" });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao cadastrar o cargo, favor contatar o suporte."});
				};
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
		},
		findById: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				const department_role = await Department.Role.findById(req.params.id);
				res.send({ department_role });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Não foi possível exibir o cargo."});
			};
		},
		findByDepartmentId: async (req, res) => {
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
		},
		remove: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				await Department.Role.remove(req.body.department_role_id);
				res.send({ done: "Cargo excluído com sucesso!" });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Não foi possível excluir o cargo."});
			};
		}
	}
};

module.exports = departmentController;