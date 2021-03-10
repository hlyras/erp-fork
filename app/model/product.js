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
	let query = "INSERT INTO cms_wt_erp.product (code, name, color, size, brand, status, image) VALUES ('"
		+product.code+"', '"
		+product.name+"','"
		+product.color+"','"
		+product.size+"','"
		+product.brand+"','"
		+product.status+"','"
		+product.image+"');";
	return db(query);
};

Product.update = async (product) => {
	let query = "UPDATE cms_wt_erp.product SET code='"+product.code
		+"', name='"+product.name
		+"', color='"+product.color
		+"', size='"+product.size
		+"', brand='"+product.brand
		+"', status='"+product.status
		+"', image='"+product.image+"' WHERE id='"+product.id+"';";
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
	findByFeedstockId: async (id) => {
		let query = "SELECT * FROM cms_wt_erp.product_feedstock WHERE feedstock_id='"+id+"';";
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

Product.price = {
	save: async (price) => {
		let query = "INSERT INTO cms_wt_erp.product_price (category_id, product_id, price) VALUES ('"
			+price.category_id+"', '"
			+price.product_id+"', '"
			+price.price+"');";
		return db(query);
	},
	update: async (price) => {
		let query = "UPDATE cms_wt_erp.product_price SET price='"+price.price+"' WHERE id='"+price.id+"';";
		return db(query);
	},
	list: async (category_id) => {
		let query = "SELECT * FROM cms_wt_erp.product_price where category_id='"+category_id+"' ORDER BY id ASC;";
		return db(query);
	},
	find: async (price) => {
		let query = "SELECT * FROM cms_wt_erp.product_price where category_id='"+price.category_id+"' AND product_id='"+price.product_id+"' ORDER BY id ASC;";
		return db(query);
	},
	delete: async (id) => {
		let query = "DELETE FROM cms_wt_erp.product_price WHERE product_id='"+id+"';";
		return db(query);
	},
	deleteAll: async (id) => {
		let query = "DELETE FROM cms_wt_erp.product_price WHERE category_id='"+id+"';";
		return db(query);
	},
	category: {
		save: async (category) => {
			let query = "INSERT INTO cms_wt_erp.product_price_category (name) VALUES ('"+category.name+"');";
			return db(query);
		},
		update: async (category) => {
			let query = "UPDATE cms_wt_erp.product_price_category SET name='"+category.name+"' WHERE id='"+category.id+"';";
			return db(query);
		},
		list: async () => {
			let query = "SELECT * FROM cms_wt_erp.product_price_category ORDER BY id ASC;";
			return db(query);
		},
		filter: async (name, params, values) => {
			let query = lib.filterQueryName(name, params, values, "cms_wt_erp", "product_price_category", "id", "ASC");
			return db(query);
		},
		findById: async (id) => {
			let query = "SELECT * FROM cms_wt_erp.product_price_category WHERE id='"+id+"';";
			return db(query);
		},
		delete: async (id) => {
			let query = "DELETE FROM cms_wt_erp.product_price_category WHERE id='"+id+"';";
			return db(query);
		}
	}
};

Product.package = {
	save: async (package) => {
		let query = "INSERT INTO cms_wt_erp.product_package (code, name, color, price, image) VALUES ('"
			+package.code+"', '"
			+package.name+"', '"
			+package.color+"', '"
			+package.price+"', '"
			+package.image+"');";
		return db(query);
	},
	update: async (package) => {
		let query = "UPDATE cms_wt_erp.product_package SET code='"+package.code
			+"', name='"+package.name
			+"', color='"+package.color
			+"', price='"+package.price
			+"', image='"+package.image+"' WHERE id='"+package.id+"';";
		return db(query);
	},
	filter: async (name, params, values) => {
		let query = lib.filterQueryName(name, params, values, "cms_wt_erp", "product_package", "code", "ASC");
		return db(query);
	},
	findByCode: async (code) => {
		let query = "SELECT * FROM cms_wt_erp.product_package WHERE code='"+code+"';";
		return db(query);
	},
	findById: async (id) => {
		let query = "SELECT * FROM cms_wt_erp.product_package WHERE id='"+id+"';";
		return db(query);	
	},
	delete: async (id) => {
		let query = "DELETE FROM cms_wt_erp.product_package WHERE id='"+id+"';";
		return db(query);
	},
	image: {
		add: async (image) => {
			let query = "INSERT INTO cms_wt_erp.product_package_image (package_id, url) VALUES ('"
				+image.package_id+"', '"
				+image.url+"');";
			return db(query);
		},
		list: async (id) => {
			let query = "SELECT * FROM cms_wt_erp.product_package_image WHERE package_id='"+id+"';";
			return db(query);
		},
		remove: async (image_id) => {
			let query = "DELETE FROM cms_wt_erp.product_package_image WHERE id='"+image_id+"';";
			return db(query);
		},
		removeByPackagetId: async (id) => {
			let query = "DELETE FROM cms_wt_erp.product_package_image WHERE package_id='"+id+"';";
			return db(query);
		}
	},
	product: {
		add: async (package_id, product) => {
			let query = "INSERT INTO cms_wt_erp.product_package_product (package_id, product_id, product_code, product_info, amount) VALUES ('"
				+package_id+"','"
				+product.id+"','"
				+product.code+"','"
				+product.info+"','"
				+product.amount+"');";
			return db(query);
		},
		list: async (package_id) => {
			let query = "SELECT * FROM cms_wt_erp.product_package_product WHERE package_id='"+package_id+"' ORDER BY id ASC;";
			return db(query);
		},
		update: async (package_product_id, product) => {
			let query = "UPDATE cms_wt_erp.product_package_product SET amount='"+product.amount+"' WHERE id='"+package_product_id+"';";
			return db(query);
		},
		remove: async (package_product_id) => {
			let query = "DELETE FROM cms_wt_erp.product_package_product WHERE id='"+package_product_id+"';";
			return db(query);
		},
		removeAll: async (package_id) => {
			let query = "DELETE FROM cms_wt_erp.product_package_product WHERE package_id='"+package_id+"';";
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