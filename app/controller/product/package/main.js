const Product = require('../../../model/product/main');
Product.package = require('../../../model/product/package/main');
Product.package.image = require('../../../model/product/package/image');
Product.package.product = require('../../../model/product/package/product');

const lib = require("jarmlib");

const userController = require('./../../user/main');

const imageController = require('./image');

packageController = {};

packageController.manage = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-vis'])) {
		return res.redirect('/');
	};

	try {
		let colors = await Product.color.list();
		res.render('product/package/manage', { user: req.user, colors: colors });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

packageController.create = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'man', 'adm-man', 'adm-vis'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let package = new Product.package();
	package.id = req.body.id || null;
	package.code = req.body.code;
	package.name = req.body.name;
	package.color = req.body.color;
	package.status = req.body.status;
	package.brand = req.body.brand;
	package.weight = req.body.weight;
	package.image = req.body.image;
	package.announcement = req.body.announcement;
	package.description = req.body.description;

	try {
		if (!package.id) {
			let verifyCodeDuplicity = await Product.package.findByCode(package.code);
			if (verifyCodeDuplicity.length) { return res.send({ msg: 'Este código de pacote já está cadastrado.' }); }

			let response = await package.create();
			if (response.err) { return res.send({ msg: response.err }); }

			for (let i in req.files) {
				await imageController.upload(req.files[i], parseInt(response.insertId));
			};

			res.send({ done: "Pacote cadastrado com sucesso!" });
		} else {
			let verifyCodeDuplicity = await Product.package.findByCode(package.code);
			if (verifyCodeDuplicity.length && verifyCodeDuplicity[0].id != package.id) {
				return res.send({ msg: 'Este código de pacote já está cadastrado.' });
			}

			for (let i in req.files) {
				await imageController.upload(req.files[i], parseInt(package.id));
			};

			let response = await package.update();
			if (response.err) { return res.send({ msg: response.err }); }

			res.send({ done: "Pacote atualizado com sucesso!" });
		}
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar o pacote!" });
	}
};

packageController.findById = async (req, res) => {
	try {
		let package = (await Product.package.findById(req.params.id))[0];
		package.images = await Product.package.image.list(req.params.id);
		package.products = await Product.package.product.list(req.params.id);

		res.send({ package });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
	};
};

packageController.filter = async (req, res) => {
	const params = { keys: [], values: [] };
	const strict_params = { keys: [], values: [] };

	lib.Query.fillParam("package.code", req.body.code, strict_params);
	lib.Query.fillParam("package.name", req.body.name, params);
	lib.Query.fillParam("package.color", req.body.color, strict_params);
	lib.Query.fillParam("package.status", req.body.status, strict_params);

	let order_params = [["package.code", "ASC"]];

	try {
		const packages = await Product.package.filter({ params, strict_params, order_params });
		res.send({ packages });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
	};
};

module.exports = packageController;