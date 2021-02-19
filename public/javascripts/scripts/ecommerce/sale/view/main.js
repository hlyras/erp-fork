Ecommerce.sale.view = {};

Ecommerce.sale.view.filter = (sales, pagination) => {
	let html = "";
	if(sales.length){
		html += "</div>";
		for(let i in sales){
			html += "<div class='box one container ground padding-5 margin-top-5 margin-bottom-5 shadow'>";
				html += "<div class='box one container'>";
				html += "<div class='mobile-box four center margin-top-5'><h3 class='tbl-show-link nowrap' onclick='Ecommerce.sale.controller.show("+sales[i].id+")'>"+sales[i].code+"</h3></div>";
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
		document.getElementById("ecommerce-sale-filter-box").innerHTML = html;
	} else {
		html += "<div class='box one center padding-10 margin-top-5 margin-bottom-5 shadow'>Nenhuma venda encontrada</div>"
		document.getElementById("ecommerce-sale-filter-box").innerHTML = html;
	};
};