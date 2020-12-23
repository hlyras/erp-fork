Sale.view = {};

Sale.view.filter = (sales, pagination) => {
	if(sales.length){
		let html = "";
		html += "<tr>";
		html += "<td>Id</td>";
		html += "<td>Data</td>";
		html += "<td>Cliente</td>";
		html += "<td>Status</td>";
		html += "</tr>";
		for(let i = pagination.page * pagination.pageSize; i < sales.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			html += "<tr>";
			html += "<td><h3 class='tbl-show-link nowrap' onclick='Sale.controller.show("+sales[i].id+")'>"+sales[i].id+"</h3></td>";
			html += "<td>"+lib.convertDate(sales[i].sale_date)+"</td>";
			html += "<td>"+sales[i].customer_name+"</td>";
			html += "<td>"+sales[i].status+"</td>";
			html += "</tr>";
		};

		document.getElementById("sale-filter-table").innerHTML = html;
	};
};

Sale.view.show = (sale) => {
	let html = "";
	html += "<h3 class='box one underline center margin-top-10'>Dados da venda #"+sale.id+"</h3>";

	html += "<div class='box one container underline box-border padding-10 margin-top-10 margin-bottom-10'>";
	
	html += "<div class='box three container underline padding-10 margin-top-10 margin-bottom-10'>";
	html += "<h4 class='box three-fourths center'>Dados do cliente</h4>";
	html += "<img class='box four icon size-30' src='/images/icon/see.png'>";
	html += "</div>'";
	html += "<h5 class='box four-fifths sevenths padding-10 center'>"+sale.customer_cnpj+"</h5>";
	html += "<h4 class='box one padding-10 center'>"+sale.customer_name+"</h4>";
	html += "</div>'";
	document.getElementById("sale-show-box").innerHTML = html;
};