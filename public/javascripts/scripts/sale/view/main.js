Sale.view = {};

Sale.view.filter = (sales, setup) => {
	let filter_div = document.getElementById("sale-filter-div");
	filter_div.innerHTML = "";

	for(let i = setup.page * setup.pageSize; i < sales.length && i < (setup.page + 1) * setup.pageSize; i++){
		let sale_div = lib.element.create("div", { class: "box b2 container border shadow padding-10 margin-top-10 radius-5" });
		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b4 lucida-grande bold input-show nowrap border shadow center pointer",
			onclick: `Sale.controller.show(${sales[i].id})`
		}, sales[i].id));

		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b3-4 lucida-grande padding-2 bold center",
		}, sales[i].customer_name));

		sale_div.append(lib.element.create("div", {
			class: "mobile-box b3 lucida-grande padding-2 center",
		}, sales[i].status));

		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b3 lucida-grande padding-2 center",
		}, sales[i].user_name));

		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b3 lucida-grande padding-2 center",
		}, lib.timestampToDate(sales[i].sale_date)));

		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b4 lucida-grande padding-2 center",
		}, `Total: R$${sales[i].value}`));

		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b4 lucida-grande padding-2 center",
		}, `Frete: R$${sales[i].shipment_value}`));

		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b4 lucida-grande padding-2 center",
		}, `Desconto: R$${sales[i].discount_value}`));

		sale_div.append(lib.element.create("div", { 
			class: "mobile-box b4 lucida-grande padding-2 center",
		}, `Valor: R$${sales[i].product_value + sales[i].package_value}`));

		filter_div.append(sale_div);
	};
};

// html += "<div class='box b1 container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
// 	html += "<div class='mobile-box b10 border center padding-5 box-hover margin-top-5 tbl-show-link nowrap' onclick='Sale.controller.show(`"+sales[i].id+"`)'><h4>"+sales[i].id+"</h4></div>";
// 	html += "<div class='mobile-box b2 border center padding-5 margin-top-5'>"+sales[i].customer_name+"</div>";
// 	html += "<div class='mobile-box b2-5 border center padding-5 margin-top-5'>"+sales[i].customer_cnpj+"</div>";
// 	html += "<div class='mobile-box b3 border center padding-5 margin-top-5'>"+lib.timestampToDate(sales[i].sale_date)+"</div>";
// 	html += "<div class='mobile-box b3 border center padding-5 margin-top-5'>"+sales[i].status+"</div>";
// 	html += "<div class='mobile-box b3 border center padding-5 margin-top-5'>"+sales[i].user_name+"</div>";
// 	html += "<div class='mobile-box container b4 border padding-5 margin-top-5'>";
// 		html += "<div class='mobile-box em08 a3 center bold'>total:</div>";
// 		html += "<div class='mobile-box b2-3 center bold'>$"+(sales[i].value).toFixed(2)+"</div>";
// 	html += "</div>";
// 	html += "<div class='mobile-box container b4 border padding-5 margin-top-5'>";
// 		html += "<div class='mobile-box em08 a3 center bold'>Frete:</div>";
// 		html += "<div class='mobile-box b2-3 center'>$"+sales[i].shipment_value.toFixed(2)+"</div>";
// 	html += "</div>";
// 	html += "<div class='mobile-box container b4 border padding-5 margin-top-5'>";
// 		html += "<div class='mobile-box em08 a3 center bold'>Desconto:</div>";
// 		html += "<div class='mobile-box b2-3 center'>$"+sales[i].discount_value.toFixed(2)+"</div>";
// 	html += "</div>";
// 	html += "<div class='mobile-box container b4 border padding-5 margin-top-5'>";
// 		html += "<div class='mobile-box em08 a3 center bold'>Valor:</div>";
// 		html += "<div class='mobile-box a2-3 center'>$"+(sales[i].value-sales[i].shipment_value).toFixed(2)+"</div>";
// 	html += "</div>";
// html += "</div>";

Sale.view.show = (sale, status) => {
	console.log(sale, status);
};

Sale.view.edit = async (sale) => {
};