Sale.pos = {
	discount: 0,
	total_value: 0 
};

Sale.pos.updateValue = () => {
	if(isNaN(Sale.package.kart.total_value)){ Sale.package.kart.total_value = 0; };
	if(isNaN(Sale.product.kart.total_value)){ Sale.product.kart.total_value = 0; };

	if(!isNaN(Sale.pos.discount)){
		Sale.pos.total_value = Sale.product.kart.total_value + Sale.package.kart.total_value - Sale.pos.discount;
	} else {
		Sale.pos.total_value = Sale.product.kart.total_value + Sale.package.kart.total_value;
	};
	document.getElementById("sale-value").innerHTML = "$"+Sale.pos.total_value.toFixed(2);
};

Sale.pos.date = document.getElementById("sale-date");
if(Sale.pos.date){
	Sale.pos.date.addEventListener("change", event => {
		lib.localStorage.update("sale-date", event.target.value);
	});
};

Sale.pos.estimated_shipping_date = document.getElementById("estimated-shipping-date");
if(Sale.pos.estimated_shipping_date){
	Sale.pos.estimated_shipping_date.addEventListener("change", event => {
		lib.localStorage.update("estimated-shipping-date", event.target.value);
	});
};

Sale.pos.payment_method = document.getElementById("payment-method");
if(Sale.pos.payment_method){
	Sale.pos.payment_method.addEventListener("change", event => {
		lib.localStorage.update("payment-method", event.target.value);
	});
};

Sale.pos.status = document.getElementById("status");
if(Sale.pos.status){
	Sale.pos.status.addEventListener("change", event => {
		lib.localStorage.update("status", event.target.value);
	});
};

Sale.pos.discount = document.getElementById("sale-discount-value");
if(Sale.pos.discount){
	Sale.pos.discount.addEventListener("change", event => {
		lib.localStorage.update("sale-discount-value", event.target.value);
		Sale.pos.discount = parseFloat(document.getElementById("sale-discount-value").value);

		if(!Sale.pos.discount){
			document.getElementById("sale-discount-value").value = 0;
		} else {
			document.getElementById("sale-discount-value").value = Sale.pos.discount.toFixed(2);
		};
		Sale.pos.updateValue();
	});
};

(async function(){
	if(lib.localStorage.verify("sale-customer")){
		let properties = JSON.parse(localStorage.getItem("sale-customer"));

		document.getElementById("sale-customer").dataset.id = properties.id;
		document.getElementById("sale-customer").dataset.person_type = properties.person_type;
		document.getElementById("sale-customer").value = properties.value;
		document.getElementById("sale-customer").readOnly = properties.readOnly;

		document.getElementById('ajax-loader').style.visibility = 'visible';
		let addresses = await Customer.address.findByCustomerId(properties.id);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!addresses){ return false };

		Sale.view.customer.address.list(addresses);
	};
}());

if(lib.localStorage.verify("sale-date")){
	let date = localStorage.getItem("sale-date");
	document.getElementById("sale-date").value = date;
};

if(lib.localStorage.verify("estimated-shipping-date")){
	let estimated_shipping_date = localStorage.getItem("estimated-shipping-date");
	document.getElementById("estimated-shipping-date").value = estimated_shipping_date;
};

if(lib.localStorage.verify("payment-method")){
	let payment_method = localStorage.getItem("payment-method");
	document.getElementById("payment-method").value = payment_method;
};

if(lib.localStorage.verify("status")){
	let status = localStorage.getItem("status");
	document.getElementById("status").value = status;
};

if(lib.localStorage.verify("sale-discount-value")){
	let discount = localStorage.getItem("sale-discount-value");
	if(!discount){ 
		Sale.pos.discount = 0;
	} else {
		Sale.pos.discount = parseFloat(discount);
		document.getElementById("sale-discount-value").value = Sale.pos.discount.toFixed(2);
	};
	Sale.pos.updateValue();
};

if(lib.localStorage.verify("sale-product-kart")){
	let kart = JSON.parse(localStorage.getItem("sale-product-kart"));
	Sale.product.kart.items = kart;
	Sale.product.kart.list("Sale.product.kart", [{"code":"Código"},{"name":"Nome"},{"color":"Cor"},{"size":"Tamanho"}]);
};

if(lib.localStorage.verify("sale-package-kart")){
	let sale_package_kart = JSON.parse(localStorage.getItem("sale-package-kart"));
	Sale.package.kart.items = sale_package_kart;
	Sale.package.kart.update("code");

	let sale_package_product_kart = "";
	for(let i in Sale.package.kart.items){
		Sale.package.product["kart"+Sale.package.kart.items[i].id] = new lib.kart("sale-package-product-kart"+Sale.package.kart.items[i].id, "Sale.package.product.kart"+Sale.package.kart.items[i].id, [{"product_info":"Descrição"}]);
		Sale.package.product["kart"+Sale.package.kart.items[i].id].id = Sale.package.kart.items[i].id;
		
		if(JSON.parse(localStorage.getItem(Sale.package.product["kart"+Sale.package.kart.items[i].id].name))){
			let sale_package_product_kart = JSON.parse(localStorage.getItem(Sale.package.product["kart"+Sale.package.kart.items[i].id].name));
			if(sale_package_product_kart.length > 0){
				Sale.package.product["kart"+Sale.package.kart.items[i].id].items = sale_package_product_kart;
			};
		} else {
			for(let j in Sale.package.kart.items[i].products){
				Sale.package.product["kart"+Sale.package.kart.items[i].id].insert("product_code", Sale.package.kart.items[i].products[j]);
			};
		};
		Sale.package.product["kart"+Sale.package.kart.items[i].id].update("product_code");
	};

	Sale.package.kart.list("Sale.package.kart", [{"code":"Código"},{"name":"Nome"},{"color":"Cor"},{"price":"Preço"}]);
	for(let i in Sale.package.product){ Sale.package.kart.set(Sale.package.product[i].id); };
};