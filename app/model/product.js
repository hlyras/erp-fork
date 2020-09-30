const db = require('../../config/connection');
const lib = require('../../config/lib');

const Product = function(){
	this.id;
	this.code;
	this.name;
	this.color;
	this.size;
};

Product.save = async (product) => {
	let query = "INSERT INTO cms_wt_erp.product (code, name, color, size, brand) VALUES ('"
		+product.code+"', '"
		+product.name+"','"
		+product.color+"','"
		+product.size+"','"
		+product.brand+"');";
	return db(query);
};

Product.update = async (product) => {
	let query = "UPDATE cms_wt_erp.product SET code='"+product.code
		+"', name='"+product.name
		+"', color='"+product.color
		+"', size='"+product.size
		+"', brand='"+product.brand+"' WHERE id='"+product.id+"';";
	return db(query);
};

Product.list = async () => {
	let query = "SELECT * FROM cms_wt_erp.product ORDER BY code ASC;";
	return db(query);
};

Product.findById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.product WHERE id='"+id+"';";
	return db(query);
};

Product.findByCode = async (code) => {
	let query = "SELECT * FROM cms_wt_erp.product WHERE code='"+code+"';";
	return db(query);
};

Product.findByName = async (name) => {
	let query = "SELECT * FROM cms_wt_erp.product WHERE name like '%"+name+"%' ORDER BY code ASC;";
	return db(query);
};

Product.filter = async (name, params, values) => {
	let query = lib.filterQueryName(name, params, values, "cms_wt_erp", "product", "code", "ASC");
	return db(query);
};

Product.delete = async (id) => {
	let query = "DELETE FROM cms_wt_erp.product WHERE id='"+id+"';";
	return db(query);
};

Product.image = {
	add: async (image) => {
		let query = "INSERT INTO cms_wt_erp.product_image (product_id, url) VALUES ('"
			+image.product_id+"', '"
			+image.url+"');";
		return db(query);
	},
	list: async (id) => {
		let query = "SELECT * FROM cms_wt_erp.product_image WHERE product_id='"+id+"';";
		return db(query);
	},
	remove: async (image_id) => {
		let query = "DELETE FROM cms_wt_erp.product_image WHERE id='"+image_id+"';";
		return db(query);
	},
	removeByProductId: async (id) => {
		let query = "DELETE FROM cms_wt_erp.product_image WHERE product_id='"+id+"';";
		return db(query);
	}
};

Product.feedstock = {
	add: async (product_feedstock) => {
		let query = "INSERT INTO cms_wt_erp.product_feedstock (product_id, feedstock_id, uom, amount, measure, category_id) VALUES ('"
			+product_feedstock.product_id+"', '"
			+product_feedstock.feedstock_id+"', '"
			+product_feedstock.uom+"', '"
			+product_feedstock.amount+"', '"
			+product_feedstock.measure+"', '"
			+product_feedstock.category_id+"');";
		return db(query);
	},
	update: async (product_feedstock) => {
		let query = "UPDATE cms_wt_erp.product_feedstock SET amount='"+product_feedstock.amount+"', measure='"+product_feedstock.measure+"', category_id='"+product_feedstock.category_id+"' WHERE id='"+product_feedstock.id+"';";
		return db(query);
	},
	findById: async (id) => {
		let query = "SELECT * FROM cms_wt_erp.product_feedstock WHERE id='"+id+"';";
		return db(query);
	},
	list: async (id) => {
		let query = "SELECT * FROM cms_wt_erp.product_feedstock WHERE product_id='"+id+"';";
		return db(query);
	},
	remove: async (id) => {
		let query = "DELETE FROM cms_wt_erp.product_feedstock WHERE id='"+id+"';";
		return db(query);
	},
	removeByProductId: async (id) => {
		let query = "DELETE FROM cms_wt_erp.product_feedstock WHERE product_id='"+id+"';";
		return db(query);
	},
	removeByFeedstockId: async (id) => {
		let query = "DELETE FROM cms_wt_erp.product_feedstock WHERE feedstock_id='"+id+"';";
		return db(query);
	},
	category: {
		save: async (product_feedstock_category) => {
			let query = "INSERT INTO cms_wt_erp.product_feedstock_category (product_id, name) VALUES ('"
				+product_feedstock_category.product_id+"', '"
				+product_feedstock_category.name+"');";
			return db(query);		
		},
		list: async (product_id) => {
			let query = "SELECT * FROM cms_wt_erp.product_feedstock_category WHERE product_id='"+product_id+"';";
			return db(query);
		},
		update: async (product_feedstock_category) => {
			let query = "UPDATE cms_wt_erp.product_feedstock_category SET name='"+product_feedstock_category.name+"' WHERE id='"+product_feedstock_category.id+"';";
			return db(query);
		}
	}
};

Product.categorySave = async (category) => {
	let query = "INSERT INTO backup.product_category (name, shortcut) VALUES ('"+category.name+"','"+category.shortcut+"');";
	return db(query);
};

Product.categoryList = async () => {
	let query = "SELECT * FROM backup.product_category ORDER BY name ASC;";
	return db(query);
};

Product.colorSave = async (color) => {
	let query = "INSERT INTO cms_wt_erp.product_color (name, shortcut) VALUES ('"+color.name+"','"+color.shortcut+"');";
	return db(query);
};

Product.colorList = async () => {
	let query = "SELECT * FROM cms_wt_erp.product_color;";
	return db(query);
};

module.exports = Product;