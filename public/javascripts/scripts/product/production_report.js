$(() => {
	$("#product-production-filter-form").on('submit', (event)=>{
		event.preventDefault();
		
		const location = document.getElementById("product-production-filter-form").elements.namedItem("location").value;

		document.getElementById('ajax-loader').style.visibility = 'visible';

		$.ajax({
			url: "/product/production/filter",
			method: "post",
			data: $("#product-production-filter-form").serialize(),
			success: (response) => {
				if(API.verifyResponse(response, 'product-production-filter-submit')){return};

				var pageSize = 10;
				var page = 0;

				document.getElementById("product-production-show-box").style.display = "none";

				function paging(){
					if(response.productions.length){
						if(location == "productProductionManage"){
							renderProductProductionAdmin(response.productions, pageSize, page, location, true);
						} else if(location == "productProductionFeedstockStorage"){
							renderProductProductionFeedstockStorage(response.productions, pageSize, page, location, false);
						};
					} else {
						lib.clearTable('product-production-filter-tbl', location);
					};
				};

				function buttonsPaging(){
					$("#"+location+"Next").prop('disabled', response.productions.length <= pageSize || page >= response.productions.length / pageSize - 1);
					$("#"+location+"Previous").prop('disabled', response.productions.length <= pageSize || page == 0);
				};

				$(function(){
				    $("#"+location+"Next").click(function(){
				        if(page < response.productions.length / pageSize - 1){
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
})

function renderProductProductionAdmin(productions, pageSize, page, location, admin){
	var html = "";
	html += "<tr>"
	html += "<td>Id</td>";
	html += "<td>Data</td>";
	// html += "<td class='nowrap'>Valor</td>";
	html += "<td>Usuário</td>";
	html += "<td>Status</td>";
	if(document.getElementById("product-production-filter-form").elements.namedItem("product_production_status").value == "Pedido confirmado"){
		html += "<td>Confirmação</td>";
	} else if(document.getElementById("product-production-filter-form").elements.namedItem("product_production_status").value == "Pedido cancelado"){
		html += "<td>Cancelamento</td>";
	};
	html += "</tr>"
	for (let i = page * pageSize; i < productions.length && i < (page + 1) * pageSize;i++){
		html += "<tr>"
		html += "<td><a class='tbl-show-link nowrap' onclick='showProductProduction("+productions[i].id+", "+admin+")'>"+productions[i].id+"</td>";
		html += "<td>"+productions[i].full_date+"</td>";
		html += "<td>"+productions[i].user+"</td>";
		html += "<td>"+productions[i].status+"</td>";
		if(productions[i].status == "Pedido solicitado"){
			html += "<td><a class='tbl-show-link nowrap' onclick='cancelProductProduction("+productions[i].id+","+productions[i].storage_id+")'>Cancelar</td>";
		} else if(productions[i].status == "Pedido confirmado"){
			html += "<td>"+productions[i].confirmation_user+"</td>";
		} else if(productions[i].status == "Pedido cancelado"){
			html += "<td>"+productions[i].confirmation_user+"</td>";
		};
		html += "</tr>"
	};

	$("#"+location+"PageNumber").text('' + (page + 1) + ' de ' + Math.ceil(productions.length / pageSize));
	document.getElementById("product-production-filter-tbl").innerHTML = html;
};

function renderProductProductionFeedstockStorage(productions, pageSize, page, location, admin){
	var html = "";
	html += "<tr>"
	html += "<td>Id</td>";
	html += "<td>Data</td>";
	// html += "<td class='nowrap'>Valor</td>";
	html += "<td>Usuário</td>";
	html += "<td>Status</td>";
	if(document.getElementById("product-production-filter-form").elements.namedItem("product_production_status").value == "Pedido confirmado"){
		html += "<td>Confirmação</td>";
	} else if(document.getElementById("product-production-filter-form").elements.namedItem("product_production_status").value == "Pedido cancelado"){
		html += "<td>Cancelamento</td>";
	};
	html += "</tr>"
	for (let i = page * pageSize; i < productions.length && i < (page + 1) * pageSize;i++){
		html += "<tr>"
		html += "<td><a class='tbl-show-link nowrap' onclick='showProductProduction("+productions[i].id+", "+admin+")'>"+productions[i].id+"</td>";
		html += "<td>"+productions[i].full_date+"</td>";
		html += "<td>"+productions[i].user+"</td>";
		html += "<td>"+productions[i].status+"</td>";
		if(productions[i].status == "Pedido solicitado"){
			html += "<td><a class='tbl-show-link nowrap' onclick='confirmProductProduction("+productions[i].id+","+productions[i].storage_id+")'>Confirmar</td>";
		} else if(productions[i].status == "Pedido confirmado"){
			html += "<td>"+productions[i].confirmation_user+"</td>";
		} else if(productions[i].status == "Pedido cancelado"){
			html += "<td>"+productions[i].confirmation_user+"</td>";
		};
		html += "</tr>"
	};

	$("#"+location+"PageNumber").text('' + (page + 1) + ' de ' + Math.ceil(productions.length / pageSize));
	document.getElementById("product-production-filter-tbl").innerHTML = html;
};

function showProductProduction(id, admin){
	if(!admin){
		document.getElementById("feedstock-purchase-show-box").style.display = "none";
		document.getElementById("feedstock-request-show-box").style.display = "none";
	};
	document.getElementById('ajax-loader').style.visibility = 'visible';

	$.ajax({
		url: "/product/production/id/"+id,
		method: "get",
		data: $("#feedstock-production-filter-form").serialize(),
		success: (response) => {
			if(API.verifyResponse(response)){return};

			document.getElementById("product-production-show-info").innerHTML = "Produção #"+response.production[0].id;

			var html = "";
			html += "<tr>";
			html += "<td class='bold'>Data</td>";
			html += "<td class='bold'>Status</td>";
			html += "</tr>";
			html += "<tr>";
			html += "<td>"+response.production[0].full_date+"</td>";
			html += "<td>"+response.production[0].status+"</td>";
			html += "</tr>";
			html += "<tr>";
			html += "<td class='bold'>Usuário</td>";
			if(response.production[0].status == "Pedido confirmado"){
				html += "<td class='bold'>Confirmação</td>";
			} else if(response.production[0].status == "Pedido cancelado"){
				html += "<td class='bold'>Cancelamento</td>";
			};
			html += "</tr>";
			html += "<tr>";
			html += "<td>"+response.production[0].user+"</td>";
			html += "<td class='nowrap'>"+response.production[0].confirmation_user+"</td>";
			html += "</tr>";

			document.getElementById("product-production-show-box").style.display = "block";
			document.getElementById("product-production-show-tbl").innerHTML = html;

			html = "";
			html += "<tr>";
			html += "<td>Produtos</td>";
			html += "<td>Qtd</td>";
			html += "</tr>";
			for(i in response.production_products){
				html += "<tr>";
				html += "<td>"+response.production_products[i].product_info+"</td>";
				html += "<td class='nowrap'>"+response.production_products[i].amount+"</td>";
				html += "</tr>";
			};

			document.getElementById("product-production-product-show-tbl").innerHTML = html;

			html = "";
			html += "<tr>";
			html += "<td>Matéria-Prima</td>";
			html += "<td>Quantidade</td>";
			html += "<td>Rolo/Caixa</td>";
			html += "</tr>";
			for(i in response.production_feedstocks){
				html += "<tr>";
				html += "<td>"+response.production_feedstocks[i].feedstock_info+"</td>";
				html += "<td class='nowrap'>"+response.production_feedstocks[i].releasedAmount+""+response.production_feedstocks[i].feedstock_uom+"</td>";
				html += "<td class='nowrap'>"+response.production_feedstocks[i].standardAmount+"un</td>";
				html += "</tr>";
			};

			document.getElementById("product-production-feedstock-show-tbl").innerHTML = html;

			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

function confirmProductProduction(production_id, storage_id){
	const r = confirm("Deseja confirmar a saída do estoque?");

	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: "/product/production/confirm",
			method: "put",
			data: {
				production_id: production_id,
				storage_id: storage_id
			},
			success: (response) => {
				if(API.verifyResponse(response)){return};

				alert(response.done);
				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				$("#product-production-filter-form").submit();
			}
		});
	}
};

function cancelProductProduction(production_id, storage_id){
	const r = confirm("Deseja cancelar este pedido?");

	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: "/product/production/cancel",
			method: "put",
			data: {
				production_id: production_id,
				storage_id: storage_id
			},
			success: (response) => {
				if(API.verifyResponse(response)){return};

				alert(response.done);
				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				$("#product-production-filter-form").submit();
			}
		});
	}
};