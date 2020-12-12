Sale.controller = {};

Sale.controller.save = document.getElementById("sale-create-form");
if(Sale.controller.save){
	Sale.controller.save.addEventListener("submit", event => {
		console.log(event);
	});
};