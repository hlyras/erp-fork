const User = require('../model/user');
const Sale = require('../model/sale');
const userController = require('./user');

const lib = require('../../config/lib');

const adminController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		res.render('admin/index', { user: req.user });
	},
	user: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		res.render('admin/user', { user: req.user });
	},
	product: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		res.render('product/index', { user: req.user });
	},
	sale: {
		index: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm', 'pro-man'])){
				return res.redirect('/');
			};
			let users = await User.list();
			res.render('admin/sale', { user: req.user, users: users });
		},
		filter: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud','pro-man','log-pac','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para acessar!" });
			};

			let params = []; let values = [];
			let strict_params = []; let strict_values = [];
			let period = { start: "", end: "" };

			let product_props = ["cms_wt_erp.sale.id","cms_wt_erp.product.name","cms_wt_erp.sale_product.product_id","cms_wt_erp.sale_product.product_info","cms_wt_erp.sale_product.amount"];
			let package_product_props = ["cms_wt_erp.sale.id","cms_wt_erp.sale.customer_name","cms_wt_erp.sale_package_product.product_id","cms_wt_erp.sale_package_product.product_info","cms_wt_erp.sale_package_product.amount"];

			let product_inners = [["cms_wt_erp.sale.id","cms_wt_erp.sale_product.sale_id"],["cms_wt_erp.sale_product.product_id","cms_wt_erp.product.id"]];
			let package_product_inners = [["cms_wt_erp.sale.id","cms_wt_erp.sale_package_product.sale_id"]];

			lib.fillDate(period, req.body.sale.periodStart, req.body.sale.periodEnd);
			lib.insertParam("origin", req.body.sale.origin, params, values);
			lib.insertParam("code", req.body.sale.code, params, values);
			lib.insertParam("customer_name", req.body.sale.customer_name, params, values);
			lib.insertParam("customer_user", req.body.sale.customer_user, params, values);
			lib.insertParam("tracker", req.body.sale.tracker, params, values);
			lib.insertParam("status", req.body.sale.status, strict_params, strict_values);

			try {
				let sale_products = await Sale.admin.product.filter(product_props, product_inners, period, params, values, strict_params, strict_values);
				let sale_package_products = await Sale.admin.package.product.filter(package_product_props, package_product_inners, period, params, values, strict_params, strict_values);
				res.send({ sale_products: sale_products, sale_package_products: sale_package_products });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
			};
		},
		report: {
			product: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm', 'pro-man'])){
					return res.redirect('/');
				};
				res.render('product/index', { user: req.user });
			},
			package: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm', 'pro-man'])){
					return res.redirect('/');
				};
				res.render('package/index', { user: req.user });
			},		
		}
	},
	ecommerce_sale: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		let users = await User.list();
		res.render('admin/ecommerce_sale', { user: req.user, users: users });
	}
};

module.exports = adminController;