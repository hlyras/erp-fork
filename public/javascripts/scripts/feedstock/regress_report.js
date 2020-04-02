$(() => {
	$("#feedstock-regress-filter-form").on("submit", event => {
		event.preventDefault();

		document.getElementById('ajax-loader').style.visibility = 'visible';

		const location = document.getElementById("feedstock-regress-filter-form").elements.namedItem("location").value;

		$.ajax({
			url: "/feedstock/regress/filter",
			method: "post",
			data: $("#feedstock-regress-filter-form").serialize(),
			success: (response) => {
				if(API.verifyResponse(response, "feedstock-regress-filter-form")){return};

				var pageSize = 10;
				var page = 0;

				function paging(){
					if(response.regresses.length){
						if(location == "feedstockRegressAdmin"){
							renderFeedstockRegressAdmin(response.regresses, pageSize, page, location);
						} else if(location == "feedstockRegressStorage"){
							renderFeedstockRegressStorage(response.regresses, pageSize, page, location);
						};
					} else {
						lib.clearTable('feedstock-regress-filter-tbl', location);
					};
				};

				function buttonsPaging(){
					$("#"+location+"Next").prop('disabled', response.regresses.length <= pageSize || page >= response.regresses.length / pageSize - 1);
					$("#"+location+"Previous").prop('disabled', response.regresses.length <= pageSize || page == 0);
				};

				$(function(){
				    $("#"+location+"Next").click(function(){
				        if(page < response.regresses.length / pageSize - 1){
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

function renderFeedstockRegressAdmin(regresses, pageSize, page, location){
	var html = "";
	html += "<tr>"
	html += "<td>Id</td>";
	html += "<td>Data</td>";
	html += "<td>Fornecedor</td>";
	html += "<td class='nowrap'>Valor</td>";
	html += "<td>Usuário</td>";
	html += "<td>Status</td>";
	html += "</tr>"
	for (let i = page * pageSize; i < regresses.length && i < (page + 1) * pageSize;i++){
		html += "<tr>"
		html += "<td><a class='tbl-show-link nowrap' onclick='showFeedstockRegress("+regresses[i].id+", "+true+")'>"+regresses[i].id+"</td>";
		html += "<td>"+regresses[i].full_date+"</td>";
		html += "<td>"+regresses[i].user+"</td>";
		html += "<td>"+regresses[i].status+"</td>";
		html += "</tr>"
	};

	$("#"+location+"PageNumber").text('' + (page + 1) + ' de ' + Math.ceil(regresses.length / pageSize));
	document.getElementById("feedstock-regress-filter-tbl").innerHTML = html;
};

function renderFeedstockRegressStorage(regresses, pageSize, page, location, admin){
	var html = "";
	html += "<tr>"
	html += "<td>Id</td>";
	html += "<td>Data</td>";
	// html += "<td class='nowrap'>Valor</td>";
	html += "<td>Motivo</td>";
	html += "<td>Usuário</td>";
	html += "<td>Status</td>";
	if(document.getElementById("feedstock-regress-filter-form").elements.namedItem("feedstock_regress_status").value == "Pedido confirmado"){
		html += "<td>Confirmação</td>";
	};
	html += "</tr>";
	for (let i = page * pageSize; i < regresses.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		html += "<td><a class='tbl-show-link nowrap' onclick='showFeedstockRegress("+regresses[i].id+", "+false+")'>"+regresses[i].id+"</td>";
		html += "<td>"+regresses[i].full_date+"</td>";
		html += "<td>"+regresses[i].user+"</td>";
		html += "<td>"+regresses[i].obs+"</td>";
		html += "<td>"+regresses[i].status+"</td>";
		if(regresses[i].status == "Pedido solicitado"){
			html += "<td><a class='tbl-show-link nowrap' onclick='confirmFeedstockRegress("+regresses[i].id+","+regresses[i].storage_id+")'>Confirmar</td>";
		} else if(regresses[i].status == "Pedido confirmado"){
			html += "<td>"+regresses[i].confirmation_user+"</td>";
		};
		html += "</tr>";
	};

	$("#"+location+"PageNumber").text('' + (page + 1) + ' de ' + Math.ceil(regresses.length / pageSize));
	document.getElementById("feedstock-regress-filter-tbl").innerHTML = html;
};

function showFeedstockRegress(id, admin){
	if(!admin){
		document.getElementById("product-production-show-box").style.display = "none";
		document.getElementById("feedstock-purchase-show-box").style.display = "none";
		document.getElementById("feedstock-request-show-box").style.display = "none";
	};
	document.getElementById('ajax-loader').style.visibility = 'visible';

	$.ajax({
		url: "/feedstock/regress/id/"+id,
		method: "get",
		data: $("#feedstock-regress-filter-form").serialize(),
		success: (response) => {
			if(API.verifyResponse(response)){return};
			
			document.getElementById("feedstock-regress-show-info").innerHTML = "Retorno #"+response.regress[0].id;

			var html = "";
			html += "<tr>";
			html += "<td class='bold'>Data</td>";
			html += "<td class='bold'>Status</td>";
			html += "</tr>";
			html += "<tr>";
			html += "<td>"+response.regress[0].full_date+"</td>";
			html += "<td>"+response.regress[0].status+"</td>";
			html += "</tr>";
			html += "<tr>";
			html += "<td class='bold'>Usuário</td>";
			html += "<td class='bold'>Confirmação</td>";
			if(admin){
				html += "<td class='bold'>Valor</td>";
			};
			html += "</tr>";
			html += "<tr>";
			html += "<td>"+response.regress[0].user+"</td>";
			html += "<td class='nowrap'>"+response.regress[0].confirmation_user+"</td>";
			html += "</tr>";

			document.getElementById("feedstock-regress-show-box").style.display = "block";
			document.getElementById("feedstock-regress-show-tbl").innerHTML = html;

			html = "";
			html += "<tr>";
			html += "<td>Matéria-Prima</td>";
			html += "<td>Qtd</td>";
			html += "<td>Rolo/Unid</td>";
			html += "</tr>";
			for(i in response.regress_feedstocks){
				html += "<tr>";
				html += "<td>"+response.regress_feedstocks[i].feedstock_info+"</td>";
				html += "<td class='nowrap'>"+response.regress_feedstocks[i].amount+""+response.regress_feedstocks[i].feedstock_uom+"</td>";
				if(response.regress_feedstocks[i].feedstock_uom == 'cm'){
					html += "<td class='nowrap'>"+response.regress_feedstocks[i].amount / response.regress_feedstocks[i].feedstock_standard+"</td>";
				} else if(response.regress_feedstocks[i].feedstock_uom == 'un'){
					html += "<td class='nowrap'>"+response.regress_feedstocks[i].amount+"</td>";
				};
				html += "</tr>";
			};

			document.getElementById("feedstock-regress-feedstock-show-tbl").innerHTML = html;

			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

function confirmFeedstockRegress(regress_id, storage_id){
	const r = confirm("Deseja confirmar o pedido?");

	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: "/feedstock/regress/confirm",
			method: "put",
			data: {
				regress_id: regress_id,
				storage_id: storage_id
			},
			success: (response) => {
				if(API.verifyResponse(response)){return};
				$("#feedstock-regress-filter-form").submit();
				document.getElementById('ajax-loader').style.visibility = 'hidden';
				alert(response.done);
			}
		});
	}
};