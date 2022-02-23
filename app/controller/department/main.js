const User = require('../../model/user');
const userController = require('./../user');

const Department = require('../../model/department/main');

const departmentController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'adm-man'])){
			return res.redirect("/");
		};

		res.render('department/index', { user: req.user });
	},
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'adm-man'])){
			return res.redirect("/");
		};

		const department = new Department();
		department.name = req.body.name;
		department.code = req.body.code;

		try {
			let result = await department.save();
			if(result.err){ return res.send({ msg: result.err }); }

			res.send({ done: "Departamento cadastrado com sucesso!" });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao cadastrar o departamento, por favor recarregue a página e tente novamente." });
		};
	},
	filter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'adm-man'])){
			return res.redirect("/");
		};

		const params = { keys: [], values: [] };
		const strict_params = { keys: [], values: [] };

		lib.Query.fillParam("product.color", req.body.product.color, strict_params);
		lib.Query.fillParam("product.brand", req.body.product.brand, params);

		try {
			let departments = await Department.filter([],[],params,strict_params,[]);

			res.send({ departments });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao cadastrar o departamento, por favor recarregue a página e tente novamente." });
		};
	}
};

module.exports = departmentController;