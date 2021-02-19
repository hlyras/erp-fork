Ecommerce.sale.origin = document.getElementById("ecommerce-sale-create-form").elements.namedItem("origin");
if(Ecommerce.sale.origin){
	Ecommerce.sale.origin.addEventListener("change", event => {
		lib.localStorage.update("ecommerce-sale-origin", event.target.value);
	});
};

if(lib.localStorage.verify("ecommerce-sale-origin")){
	let origin = localStorage.getItem("ecommerce-sale-origin");
	document.getElementById("ecommerce-sale-create-form").elements.namedItem("origin").value = origin;
};

Ecommerce.sale.code = document.getElementById("ecommerce-sale-create-form").elements.namedItem("code");
if(Ecommerce.sale.code){
	Ecommerce.sale.code.addEventListener("change", event => {
		lib.localStorage.update("ecommerce-sale-code", event.target.value);
	});
};

if(lib.localStorage.verify("ecommerce-sale-code")){
	let code = localStorage.getItem("ecommerce-sale-code");
	document.getElementById("ecommerce-sale-create-form").elements.namedItem("code").value = code;
};

Ecommerce.sale.customer_user = document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-user");
if(Ecommerce.sale.customer_user){
	Ecommerce.sale.customer_user.addEventListener("change", event => {
		lib.localStorage.update("ecommerce-sale-customer-user", event.target.value);
	});
};

if(lib.localStorage.verify("ecommerce-sale-customer-user")){
	let customer_user = localStorage.getItem("ecommerce-sale-customer-user");
	document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-user").value = customer_user;
};

Ecommerce.sale.customer_name = document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-name");
if(Ecommerce.sale.customer_name){
	Ecommerce.sale.customer_name.addEventListener("change", event => {
		lib.localStorage.update("ecommerce-sale-customer-name", event.target.value);
	});
};

if(lib.localStorage.verify("ecommerce-sale-customer-name")){
	let customer_name = localStorage.getItem("ecommerce-sale-customer-name");
	document.getElementById("ecommerce-sale-create-form").elements.namedItem("customer-name").value = customer_name;
};

Ecommerce.sale.datetime = document.getElementById("ecommerce-sale-create-form").elements.namedItem("datetime");
if(Ecommerce.sale.datetime){
	Ecommerce.sale.datetime.addEventListener("change", event => {
		lib.localStorage.update("ecommerce-sale-datetime", event.target.value);
	});
};

if(lib.localStorage.verify("ecommerce-sale-datetime")){
	let datetime = localStorage.getItem("ecommerce-sale-datetime");
	document.getElementById("ecommerce-sale-create-form").elements.namedItem("datetime").value = datetime;
};

Ecommerce.sale.tracker = document.getElementById("ecommerce-sale-create-form").elements.namedItem("tracker");
if(Ecommerce.sale.tracker){
	Ecommerce.sale.tracker.addEventListener("change", event => {
		lib.localStorage.update("ecommerce-sale-tracker", event.target.value);
	});
};

if(lib.localStorage.verify("ecommerce-sale-tracker")){
	let tracker = localStorage.getItem("ecommerce-sale-tracker");
	document.getElementById("ecommerce-sale-create-form").elements.namedItem("tracker").value = tracker;
};

Ecommerce.sale.status = document.getElementById("ecommerce-sale-create-form").elements.namedItem("status");
if(Ecommerce.sale.status){
	Ecommerce.sale.status.addEventListener("change", event => {
		lib.localStorage.update("ecommerce-sale-status", event.target.value);
	});
};

if(lib.localStorage.verify("ecommerce-sale-status")){
	let status = localStorage.getItem("ecommerce-sale-status");
	document.getElementById("ecommerce-sale-create-form").elements.namedItem("status").value = status;
};