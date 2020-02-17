$(() => {
	$("#feedstock-purchase-filter-form").on("submit", event => {
		event.preventDefault();
		console.log('ok');

		$.ajax({
			url: "/feedstock/purchase/filter",
			method: "post",
			data: $("#feedstock-purchase-filter-form").serialize(),
			success: (response) => {
				renderFeedstockPurchases(response.purchases);
			}
		})
	});
});

function renderFeedstockPurchases(purchases){
	var html = "";
	html += "<tr>"
	html += "<td>Id</td>";
	html += "<td>Data</td>";
	html += "<td>Fornecedor</td>";
	html += "<td>Valor</td>";
	html += "<td>Usuário</td>";
	html += "<td>Status</td>";
	html += "</tr>"
	for(i in purchases){
		html += "<tr>"
		html += "<td>"+purchases[i].id+"</td>";
		html += "<td>"+purchases[i].full_date+"</td>";
		html += "<td>"+purchases[i].supplier_name+"</td>";
		html += "<td>"+purchases[i].value+"</td>";
		html += "<td>"+purchases[i].user+"</td>";
		html += "<td>"+purchases[i].status+"</td>";
		html += "</tr>"
	};

	document.getElementById("feedstock-purchase-tbl").innerHTML = html;
};