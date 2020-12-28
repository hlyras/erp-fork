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

	html += "<div class='box three container box-border padding-10 margin-top-10'>";
		html += "<div class='box one container underline'>";
			html += "<h4 class='mobile-box six-sevenths center'>Dados do cliente</h4>";
			html += "<img class='mobile-box seven icon size-25' src='/images/icon/see.png'>";
		html += "</div>";
		html += "<div class='box one container'>";
			html += "<h5 class='box one padding-10'>Nome: "+sale.customer_name+"</h5>";
			html += "<h5 class='box one padding-10'>CNPJ: "+sale.customer_cnpj+"</h5>";
		html += "</div>";
	html += "</div>";

	html += "<div class='box three container box-border padding-10 margin-top-10'>";
		html += "<div class='box one container underline'>";
			html += "<h4 class='box one center'>Dados da venda</h4>";
		html += "</div>";
		html += "<div class='box one container'>";
			html += "<h5 class='box one padding-10'>Data: "+lib.convertDate(sale.sale_date)+"</h5>";
			html += "<h5 class='box one padding-10'>Pagamento: "+sale.payment_method+"</h5>";
			html += "<h5 class='box one padding-10'>Status: "+sale.status+"</h5>";
		html += "</div>";
	html += "</div>";

	html += "<div class='box three container box-border padding-10 margin-top-10'>";
		html += "<div class='box one container underline'>";
			html += "<h4 class='box one center'>Dados de envio</h4>";
		html += "</div>";
		html += "<div class='box one container'>";
			html += "<h5 class='box one padding-10'>Status: "+sale.status+"</h5>";
			html += "<h5 class='box one padding-10'>Pagamento: "+sale.payment_method+"</h5>";
		html += "</div>";
	html += "</div>";

	html += "<div class='box one container box-border padding-10 margin-top-10 margin-bottom-10'>";
		html += "<table class='box one tbl-info'>";
		html += "<tr>";
		html += "<td>Info</td>";
		html += "<td>Qtd</td>";
		html += "<td>Valor</td>";
		html += "<td>Valor total</td>";
		html += "</tr>";

		for(i in sale.products){
			html += "<tr>";
			html += "<td>"+sale.products[i].product_info+"</td>";
			html += "<td>"+sale.products[i].product_amount+"</td>";
			html += "<td>$"+sale.products[i].product_price+"</td>";
			html += "<td>$"+(sale.products[i].product_amount * sale.products[i].product_price)+"</td>";
			html += "</tr>";
		}
	html += "</table>";
	document.getElementById("sale-show-box").innerHTML = html;
};