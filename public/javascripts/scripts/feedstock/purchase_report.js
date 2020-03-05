$(() => {
	$("#feedstock-purchase-filter-form").on("submit", event => {
		event.preventDefault();

		document.getElementById('ajax-loader').style.visibility = 'visible';

		const location = document.getElementById("feedstock-purchase-filter-form").elements.namedItem("location").value;

		$.ajax({
			url: "/feedstock/purchase/filter",
			method: "post",
			data: $("#feedstock-purchase-filter-form").serialize(),
			success: (response) => {
				var pageSize = 10;
				var page = 0;

				function paging(){
					if(response.purchases.length){
						if(location == "feedstockPurchaseAdmin"){
							renderFeedstockPurchasesAdmin(response.purchases, pageSize, page, location);
						} else if(location == "feedstockPurchaseStorage"){
							renderFeedstockPurchasesStorage(response.purchases, pageSize, page, location);
						};
					} else {
						lib.clearTable('feedstock-purchase-filter-tbl', location);
					};
				};

				function buttonsPaging(){
					$("#"+location+"Next").prop('disabled', response.purchases.length <= pageSize || page >= response.purchases.length / pageSize - 1);
					$("#"+location+"Previous").prop('disabled', response.purchases.length <= pageSize || page == 0);
				};

				$(function(){
				    $("#"+location+"Next").click(function(){
				        if(page < response.purchases.length / pageSize - 1){
				            page++;
				            paging();
				            buttonsPaging();
				        };
				    });
				    $("#"+location+"Previous").click(function(){
				        if(page > 0){
				            page--;
				            paging();
				            buttonsPaging();
				        };
				    });
				    paging();
				    buttonsPaging();
				});

				document.getElementById('ajax-loader').style.visibility = 'hidden';
			}
		});
	});
});

function renderFeedstockPurchasesAdmin(purchases, pageSize, page, location){
	var html = "";
	html += "<tr>"
	html += "<td>Id</td>";
	html += "<td>Data</td>";
	html += "<td>Fornecedor</td>";
	html += "<td class='nowrap'>Valor</td>";
	html += "<td>Usuário</td>";
	html += "<td>Status</td>";
	html += "</tr>"
	for (let i = page * pageSize; i < purchases.length && i < (page + 1) * pageSize;i++){
		html += "<tr>"
		html += "<td><a class='tbl-show-link nowrap' onclick='showFeedstockPurchase("+purchases[i].id+", "+true+")'>"+purchases[i].id+"</td>";
		html += "<td>"+purchases[i].full_date+"</td>";
		html += "<td>"+purchases[i].supplier_name+"</td>";
		html += "<td class='nowrap'>$"+purchases[i].value+"</td>";
		html += "<td>"+purchases[i].user+"</td>";
		html += "<td>"+purchases[i].status+"</td>";
		html += "</tr>"
	};

	$("#"+location+"PageNumber").text('' + (page + 1) + ' de ' + Math.ceil(purchases.length / pageSize));
	document.getElementById("feedstock-purchase-filter-tbl").innerHTML = html;
};

function renderFeedstockPurchasesStorage(purchases, pageSize, page, location, admin){
	var html = "";
	html += "<tr>"
	html += "<td>Id</td>";
	html += "<td>Data</td>";
	html += "<td>Fornecedor</td>";
	// html += "<td class='nowrap'>Valor</td>";
	html += "<td>Usuário</td>";
	html += "<td>Status</td>";
	if(document.getElementById("feedstock-purchase-filter-form").elements.namedItem("feedstock_purchase_status").value == "Pedido confirmado"){
		html += "<td>Confirmação</td>";
	};
	html += "</tr>"
	for (let i = page * pageSize; i < purchases.length && i < (page + 1) * pageSize;i++){
		html += "<tr>"
		html += "<td><a class='tbl-show-link nowrap' onclick='showFeedstockPurchase("+purchases[i].id+", "+false+")'>"+purchases[i].id+"</td>";
		html += "<td>"+purchases[i].full_date+"</td>";
		html += "<td>"+purchases[i].supplier_name+"</td>";
		html += "<td>"+purchases[i].user+"</td>";
		html += "<td>"+purchases[i].status+"</td>";
		if(purchases[i].status == "Pedido solicitado"){
			html += "<td><a class='tbl-show-link nowrap' onclick='confirmFeedstockPurchase("+purchases[i].id+","+purchases[i].storage_id+")'>Confirmar</td>";
		} else if(purchases[i].status == "Pedido confirmado"){
			html += "<td>"+purchases[i].confirmation_user+"</td>";
		};
		html += "</tr>"
	};

	$("#"+location+"PageNumber").text('' + (page + 1) + ' de ' + Math.ceil(purchases.length / pageSize));
	document.getElementById("feedstock-purchase-filter-tbl").innerHTML = html;
};

function showFeedstockPurchase(id, admin){
	if(!admin){
		document.getElementById("product-production-show-box").style.display = "none";
	};
	document.getElementById('ajax-loader').style.visibility = 'visible';

	$.ajax({
		url: "/feedstock/purchase/id/"+id,
		method: "get",
		data: $("#feedstock-purchase-filter-form").serialize(),
		success: (response) => {
			document.getElementById("feedstock-purchase-show-info").innerHTML = "Compra #"+response.purchase[0].id;

			var html = "";
			html += "<tr>";
			html += "<td class='bold'>Fornecedor</td>";
			html += "<td class='bold'>Data</td>";
			html += "<td class='bold'>Status</td>";
			html += "</tr>";
			html += "<tr>";
			html += "<td>"+response.purchase[0].supplier_name+"</td>";
			html += "<td>"+response.purchase[0].full_date+"</td>";
				html += "<td>"+response.purchase[0].status+"</td>";
			html += "</tr>";
			html += "<tr>";
			html += "<td class='bold'>Usuário</td>";
			html += "<td class='bold'>Confirmação</td>";
			if(admin){
				html += "<td class='bold'>Valor</td>";
			};
			html += "</tr>";
			html += "<tr>";
			html += "<td>"+response.purchase[0].user+"</td>";
			html += "<td class='nowrap'>"+response.purchase[0].confirmation_user+"</td>";
			if(admin){
				html += "<td>$"+response.purchase[0].value+"</td>";
			};
			html += "</tr>";

			document.getElementById("feedstock-purchase-show-box").style.display = "block";
			document.getElementById("feedstock-purchase-show-tbl").innerHTML = html;

			html = "";
			html += "<tr>";
			html += "<td>Matéria-Prima</td>";
			html += "<td>Qtd</td>";
			html += "<td>Rolo/Caixa</td>";
			if(admin){
				html += "<td>Valor</td>";
				html += "<td>Valor Total</td>";
			};
			html += "</tr>";
			for(i in response.purchase_feedstocks){
				html += "<tr>";
				html += "<td>"+response.purchase_feedstocks[i].feedstock_info+"</td>";
				html += "<td class='nowrap'>"+response.purchase_feedstocks[i].amount+""+response.purchase_feedstocks[i].feedstock_uom+"</td>";
				html += "<td class='nowrap'>"+lib.roundValue(response.purchase_feedstocks[i].amount / response.purchase_feedstocks[i].feedstock_standard)+"</td>";
				if(admin){
					html += "<td class='nowrap'>"+response.purchase_feedstocks[i].feedstock_value+"</td>";
					if(response.purchase_feedstocks[i].feedstock_uom == "cm"){
						html += "<td class='nowrap'>$"+lib.roundValue((response.purchase_feedstocks[i].feedstock_value / 100) * response.purchase_feedstocks[i].amount)+"</td>";
					} else if(response.purchase_feedstocks[i].feedstock_uom == "un"){
						html += "<td class='nowrap'>$"+lib.roundValue(response.purchase_feedstocks[i].feedstock_value * response.purchase_feedstocks[i].amount)+"</td>";
					};
				};
				html += "</tr>";
			};

			document.getElementById("feedstock-purchase-feedstock-show-tbl").innerHTML = html;

			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

function confirmFeedstockPurchase(purchase_id, storage_id){
	const r = confirm("Deseja confirmar a entrada no estoque?");

	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: "/feedstock/purchase/confirm",
			method: "put",
			data: {
				purchase_id: purchase_id,
				storage_id: storage_id
			},
			success: (response) => {
				$("#feedstock-purchase-filter-form").submit();
				document.getElementById('ajax-loader').style.visibility = 'hidden';
				alert(response.done);
			}
		});
	}
};