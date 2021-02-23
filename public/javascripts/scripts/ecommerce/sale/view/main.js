Ecommerce.sale.view = {};

Ecommerce.sale.view.filter = (sales, pagination) => {
	let html = "";
	if(sales.length){
		html += "</div>";
		for(let i in sales){
			html += "<div class='box one container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
				html += "<div class='box one container'>";
				html += "<div class='mobile-box four center margin-top-5 tbl-show-link nowrap' onclick='Ecommerce.sale.controller.edit(`"+sales[i].id+"`)'><h4>"+sales[i].code+"</h4></div>";
				html += "<div class='mobile-box four center margin-top-5'>"+sales[i].origin+"</div>";
				html += "<div class='mobile-box four center margin-top-5'>"+lib.timestampToDate(sales[i].datetime)+"</div>";
				html += "<div class='mobile-box four center margin-top-5'>"+sales[i].status+"</div>";
				html += "</div>";
				html += "<div class='box one container'>";
				html += "<div class='mobile-box four center margin-top-5'>"+sales[i].customer_name+"</div>";
				html += "<div class='mobile-box four center margin-top-5'>"+sales[i].customer_user+"</div>";
				html += "<div class='mobile-box four center margin-top-5'>"+sales[i].user_name+"</div>";
				html += "<div class='mobile-box four center margin-top-5'>"+sales[i].tracker+"</div>";
				html += "</div>";
			html += "</div>";
		};
		document.getElementById("ecommerce-sale-filter-box").style.display = "";
		document.getElementById("ecommerce-sale-filter-box").innerHTML = html;
	} else {
		html += "<div class='box one center padding-10 margin-top-5 margin-bottom-5 shadow'>Nenhuma venda encontrada</div>";
		document.getElementById("ecommerce-sale-filter-box").style.display = "";
		document.getElementById("ecommerce-sale-filter-box").innerHTML = html;
	};
};

Ecommerce.sale.view.edit = (sale) => {
	document.getElementById("ecommerce-sale-create-form").elements.namedItem("id").value = sale.id;
	document.getElementById("ecommerce-sale-create-form").elements.namedItem("origin").value = sale.origin;
	document.getElementById("ecommerce-sale-create-form").elements.namedItem("code").value = sale.code;
	document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-user").value = sale.customer_user;
	document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-name").value = sale.customer_name;
	document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-phone").value = sale.customer_phone;
	document.getElementById("ecommerce-sale-create-form").elements.namedItem("datetime").value = lib.timestampToDatetime(sale.datetime);
	document.getElementById("ecommerce-sale-create-form").elements.namedItem("tracker").value = sale.tracker;
	document.getElementById("ecommerce-sale-create-form").elements.namedItem("status").value = sale.status;

	for(let i in sale.products){
		sale.products[i].code = sale.products[i].info.split(" | ")[0];
		sale.products[i].name = sale.products[i].info.split(" | ")[1];
		sale.products[i].color = sale.products[i].info.split(" | ")[2];
		sale.products[i].size = sale.products[i].info.split(" | ")[3];
	};

	Ecommerce.sale.product.kart.items = sale.products;
	Ecommerce.sale.product.kart.list("Ecommerce.sale.product.kart", Ecommerce.sale.product.kart.props);

	for(let i in sale.packages){
		sale.packages[i].id = sale.packages[i].package_id;
		sale.packages[i].code = sale.packages[i].info.split(" | ")[0];
		sale.packages[i].name = sale.packages[i].info.split(" | ")[1];
		sale.packages[i].color = sale.packages[i].info.split(" | ")[2];
	};

	Ecommerce.sale.package.kart.items = sale.packages;

	for(let i in Ecommerce.sale.package.kart.items){
		Ecommerce.sale.package.product["kart"+Ecommerce.sale.package.kart.items[i].id] = new lib.kart("ecommerce-sale-package-product-kart"+Ecommerce.sale.package.kart.items[i].id, "Ecommerce.sale.package.product.kart"+Ecommerce.sale.package.kart.items[i].id, [{"product_info":"Descrição"}]);
		Ecommerce.sale.package.product["kart"+Ecommerce.sale.package.kart.items[i].id].id = Ecommerce.sale.package.kart.items[i].id;
		
		for(let j in Ecommerce.sale.package.kart.items[i].products){
			Ecommerce.sale.package.kart.items[i].products[j].product_code = Ecommerce.sale.package.kart.items[i].products[j].product_info.split(" | ")[0];		
			Ecommerce.sale.package.product["kart"+Ecommerce.sale.package.kart.items[i].id].insert("id", Ecommerce.sale.package.kart.items[i].products[j]);
		};
		Ecommerce.sale.package.product["kart"+Ecommerce.sale.package.kart.items[i].id].update("product_code");
	};

	Ecommerce.sale.package.kart.list("Ecommerce.sale.package.kart", [{"code":"Código"},{"name":"Nome"},{"color":"Cor"}]);
	for(let i in Ecommerce.sale.package.product){ Ecommerce.sale.package.kart.set(Ecommerce.sale.package.product[i].id); };

	document.getElementById("ecommerce-sale-show-box").style.display = "";
};