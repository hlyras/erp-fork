Sale.view = {};

Sale.view.filter = (sales) => {
	if(sales.length){
		let html = "";
		html += "<tr>";
		html += "<td>Id</td>";
		html += "<td>Data</td>";
		html += "<td>Cliente</td>";
		html += "<td>Status</td>";
		html += "</tr>";
		for(i in sales){
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