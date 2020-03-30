$(() => {
	$("#feedstock-request-filter-form").on("submit", event => {
		event.preventDefault();

		document.getElementById('ajax-loader').style.visibility = 'visible';

		const location = document.getElementById("feedstock-request-filter-form").elements.namedItem("location").value;

		$.ajax({
			url: "/feedstock/request/filter",
			method: "post",
			data: $("#feedstock-request-filter-form").serialize(),
			success: (response) => {
				if(API.verifyResponse(response, "feedstock-request-filter-form")){return};

				var pageSize = 10;
				var page = 0;

				function paging(){
					if(response.requests.length){
						if(location == "feedstockRequestAdmin"){
							renderFeedstockRequestsAdmin(response.requests, pageSize, page, location);
						} else if(location == "feedstockRequestStorage"){
							renderFeedstockRequestStorage(response.requests, pageSize, page, location);
						};
					} else {
						lib.clearTable('feedstock-request-filter-tbl', location);
					};
				};

				function buttonsPaging(){
					$("#"+location+"Next").prop('disabled', response.requests.length <= pageSize || page >= response.requests.length / pageSize - 1);
					$("#"+location+"Previous").prop('disabled', response.requests.length <= pageSize || page == 0);
				};

				$(function(){
				    $("#"+location+"Next").click(function(){
				        if(page < response.requests.length / pageSize - 1){
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

function renderFeedstockRequestAdmin(requests, pageSize, page, location){
	var html = "";
	html += "<tr>"
	html += "<td>Id</td>";
	html += "<td>Data</td>";
	html += "<td>Fornecedor</td>";
	html += "<td class='nowrap'>Valor</td>";
	html += "<td>Usuário</td>";
	html += "<td>Status</td>";
	html += "</tr>"
	for (let i = page * pageSize; i < requests.length && i < (page + 1) * pageSize;i++){
		html += "<tr>"
		html += "<td><a class='tbl-show-link nowrap' onclick='showFeedstockRequest("+requests[i].id+", "+true+")'>"+requests[i].id+"</td>";
		html += "<td>"+requests[i].full_date+"</td>";
		html += "<td>"+requests[i].user+"</td>";
		html += "<td>"+requests[i].status+"</td>";
		html += "</tr>"
	};

	$("#"+location+"PageNumber").text('' + (page + 1) + ' de ' + Math.ceil(requests.length / pageSize));
	document.getElementById("feedstock-request-filter-tbl").innerHTML = html;
};

function renderFeedstockRequestStorage(requests, pageSize, page, location, admin){
	var html = "";
	html += "<tr>"
	html += "<td>Id</td>";
	html += "<td>Data</td>";
	// html += "<td class='nowrap'>Valor</td>";
	html += "<td>Motivo</td>";
	html += "<td>Usuário</td>";
	html += "<td>Status</td>";
	if(document.getElementById("feedstock-request-filter-form").elements.namedItem("feedstock_request_status").value == "Pedido confirmado"){
		html += "<td>Confirmação</td>";
	};
	html += "</tr>";
	for (let i = page * pageSize; i < requests.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		html += "<td><a class='tbl-show-link nowrap' onclick='showFeedstockRequest("+requests[i].id+", "+false+")'>"+requests[i].id+"</td>";
		html += "<td>"+requests[i].full_date+"</td>";
		html += "<td>"+requests[i].user+"</td>";
		html += "<td>"+requests[i].obs+"</td>";
		html += "<td>"+requests[i].status+"</td>";
		if(requests[i].status == "Pedido solicitado"){
			html += "<td><a class='tbl-show-link nowrap' onclick='confirmFeedstockRequest("+requests[i].id+","+requests[i].storage_id+")'>Confirmar</td>";
		} else if(requests[i].status == "Pedido confirmado"){
			html += "<td>"+requests[i].confirmation_user+"</td>";
		};
		html += "</tr>";
	};

	$("#"+location+"PageNumber").text('' + (page + 1) + ' de ' + Math.ceil(requests.length / pageSize));
	document.getElementById("feedstock-request-filter-tbl").innerHTML = html;
};

function showFeedstockRequest(id, admin){
	if(!admin){
		document.getElementById("product-production-show-box").style.display = "none";
		document.getElementById("feedstock-request-show-box").style.display = "none";
	};
	document.getElementById('ajax-loader').style.visibility = 'visible';

	$.ajax({
		url: "/feedstock/request/id/"+id,
		method: "get",
		data: $("#feedstock-request-filter-form").serialize(),
		success: (response) => {
			if(API.verifyResponse(response)){return};
			
			document.getElementById("feedstock-request-show-info").innerHTML = "Compra #"+response.request[0].id;

			var html = "";
			html += "<tr>";
			html += "<td class='bold'>Data</td>";
			html += "<td class='bold'>Status</td>";
			html += "</tr>";
			html += "<tr>";
			html += "<td>"+response.request[0].full_date+"</td>";
			html += "<td>"+response.request[0].status+"</td>";
			html += "</tr>";
			html += "<tr>";
			html += "<td class='bold'>Usuário</td>";
			html += "<td class='bold'>Confirmação</td>";
			if(admin){
				html += "<td class='bold'>Valor</td>";
			};
			html += "</tr>";
			html += "<tr>";
			html += "<td>"+response.request[0].user+"</td>";
			html += "<td class='nowrap'>"+response.request[0].confirmation_user+"</td>";
			html += "</tr>";

			document.getElementById("feedstock-request-show-box").style.display = "block";
			document.getElementById("feedstock-request-show-tbl").innerHTML = html;

			html = "";
			html += "<tr>";
			html += "<td>Matéria-Prima</td>";
			html += "<td>Qtd</td>";
			html += "<td>Rolo/Unid</td>";
			html += "</tr>";
			for(i in response.request_feedstocks){
				html += "<tr>";
				html += "<td>"+response.request_feedstocks[i].feedstock_info+"</td>";
				html += "<td class='nowrap'>"+response.request_feedstocks[i].amount+""+response.request_feedstocks[i].feedstock_uom+"</td>";
				if(response.request_feedstocks[i].feedstock_uom == 'cm'){
					html += "<td class='nowrap'>"+response.request_feedstocks[i].amount / response.request_feedstocks[i].feedstock_standard+"</td>";
				} else if(response.request_feedstocks[i].feedstock_uom == 'un'){
					html += "<td class='nowrap'>"+response.request_feedstocks[i].amount+"</td>";
				};
				html += "</tr>";
			};

			document.getElementById("feedstock-request-feedstock-show-tbl").innerHTML = html;

			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

function confirmFeedstockRequest(request_id, storage_id){
	const r = confirm("Deseja confirmar o pedido?");

	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: "/feedstock/request/confirm",
			method: "put",
			data: {
				request_id: request_id,
				storage_id: storage_id
			},
			success: (response) => {
				if(API.verifyResponse(response)){return};
				$("#feedstock-request-filter-form").submit();
				document.getElementById('ajax-loader').style.visibility = 'hidden';
				alert(response.done);
			}
		});
	}
};